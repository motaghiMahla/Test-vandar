import {useMemo, useRef, useCallback, useContext, useState, lazy} from 'react'
import {useTranslation} from 'react-i18next'
import {useForm} from 'react-hook-form'
import {useCookies} from 'react-cookie'
import NumberFormat from 'react-number-format'

import {AppContext} from 'appContext'
import {Form, Banner, OTP} from 'components'
import {Eye, ClosedEye} from 'assets/icons'
import {irMobileOnly, space, authAccessToken, authRefreshToken} from 'shared'

import {eyeHandler, post} from 'utils'

import style from './login.module.scss'

const Logo = lazy(() =>
  import('components/logo' /* webpackChunkName: "logo" */),
)

/**
 *
 * @param {bool} backButton
 */

function Login({backButton = true}) {
  const initialStates = useMemo(
    () => ({
      mobile: '',
      status: 'idle',
      bannerStatus: false,
      resetRequest: 'idle',
      showPass: false,
      verificationStep: false,
      httpRequestErrors: {},
    }),
    [],
  )
  const defaultValues = useMemo(
    () => ({
      mobile: '',
      password: '',
    }),
    [],
  )

  const {appState, setAppState} = useContext(AppContext)

  const [state, setState] = useState(initialStates)

  const {t} = useTranslation()

  const [, setCookie] = useCookies()

  const tRef = useRef(t)
  const loginRef = useRef()
  const setCookieRef = useRef(setCookie)

  const setAppStateRef = useRef(setAppState)

  const {
    handleSubmit,
    control,
    register,
    formState: {errors},
  } = useForm({defaultValues})

  const {
    resetRequest,
    status,
    bannerStatus,
    verificationStep,
    httpRequestErrors,
    showPass,
  } = state

  const bannerCloseHandler = useCallback(() => {
    setState(prev => ({...prev, bannerStatus: false}))
  }, [])
  const verificationStepHandler = useCallback(
    () =>
      setState(prev => ({...prev, verificationStep: !prev.verificationStep})),
    [],
  )
  const formSubmitHandler = useCallback(formData => {
    setAppStateRef.current(prev => ({
      ...prev,
      mobile: formData.mobile?.replace(space, ''),
      password: formData.password,
    }))

    const data = {
      mobile: formData.mobile?.replace(space, ''),
      password: formData.password,
    }
    post({
      endpoint: 'v3/login',
      body: data,
    }).then(
      response => {
        setAppStateRef.current(prev => ({
          ...prev,
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
        }))

        setCookieRef.current(authAccessToken, response.access_token, {
          maxAge: response.expires_in,
          sameSite: 'lax',
          path: '/',
        })
        setCookieRef.current(authRefreshToken, response.refresh_token, {
          maxAge: response.expires_in,
          sameSite: 'lax',
          path: '/',
        })
      },
      error => setState(prev => ({...prev, status: 'rejected'})),
    )
  }, [])

  const mobileErrors = useMemo(
    () => [
      errors?.mobile?.type === 'required' &&
        tRef.current('errors.required', {input: tRef.current('labels.mobile')}),
      errors?.mobile?.type === 'pattern' &&
        tRef.current('errors.pattern', {input: tRef.current('labels.mobile')}),
      httpRequestErrors?.destination?.length > 0 &&
        httpRequestErrors.destination,
    ],
    [errors?.mobile?.type, httpRequestErrors?.destination],
  )

  const passwordErrors = useMemo(
    () => [
      errors?.password?.type === 'required' &&
        tRef.current('errors.required', {
          input: tRef.current('labels.password'),
        }),
      httpRequestErrors?.password1?.length > 0 && httpRequestErrors.password1,
    ],
    [errors?.password?.type, httpRequestErrors?.password1],
  )
  const handleResetPassword = useCallback(
    (formData, setState) => {
      verificationStepHandler()

      setState(prev => ({
        ...prev,
        httpRequestErrors: {},
        resetRequest: 'pending',
      }))
      const data = {
        mobile: '09134587478',
        Key: '12345',
        scope: 'ForgotPass',
      }

      post({endpoint: 'v2/change/password', body: data}).then(
        response => {
          if (response) {
            setState(prev => ({
              ...prev,
              bannerStatus: true,
              resetRequest: 'resolved',
            }))
          } else {
            setState(prev => ({
              ...prev,
              resetRequest: 'rejected',
            }))
          }
        },
        error =>
          setState(prev => ({
            ...prev,
            httpRequestErrors: error,
            bannerStatus: true,
            resetRequest: 'rejected',
          })),
      )
    },
    [verificationStepHandler],
  )

  const formElements = useMemo(
    () => [
      {
        tag: 'control',
        label: tRef.current('labels.mobile'),
        placeholder: tRef.current('placeholders.mobile'),
        name: 'mobile',
        id: 'mobile',
        key: 'mobile',
        control: control,
        rules: {
          required: true,
          pattern: irMobileOnly,
        },
        'aria-invalid': errors?.mobile ? 'true' : 'false',
        errorMessages: mobileErrors,
        render: ({field: {ref, ...otherFields}}) => (
          <NumberFormat
            className="direction-ltr"
            format="#### ### ####"
            mask="_"
            placeholder={tRef.current('placeholders.mobile')}
            {...otherFields}
          />
        ),
      },
      {
        tag: 'input',
        name: 'password',
        key: 'password',
        type: 'password',
        containerClass: style.password,
        label: tRef.current('labels.password'),
        placeholder: tRef.current('placeholders.password'),
        icon: showPass ? <ClosedEye /> : <Eye />,
        iconOnClick: event => {
          setState(prev => ({...prev, showPass: !prev.showPass}))
          eyeHandler(event)
        },
        reference: {
          ...register('password', {
            required: true,
          }),
        },
        errorMessages: passwordErrors,
      },
      {
        tag: 'p',
        key: 'password-recovery',
        className: 'link',
        style: {cursor: 'pointer', display: 'inline-block'},
        children: tRef.current('buttons.passwordRecovery'),
        onClick: e => {
          e.preventDefault()
          handleResetPassword(setState)
        },
      },
      {
        tag: 'button',
        key: 'logIn',
        type: 'submit',
        className: `primary large`,
        text: tRef.current('buttons.continue'),
        disabled: status === 'pending' ? 'disabled' : false,
      },
    ],
    [
      control,
      errors?.mobile,
      handleResetPassword,
      mobileErrors,
      passwordErrors,
      register,
      showPass,
      status,
    ],
  )

  return (
    <div className={style.login} ref={loginRef}>
      <div className={style.sideBar}>
        {httpRequestErrors?.detail && bannerStatus && (
          <Banner
            content={httpRequestErrors.detail}
            closeHandler={bannerCloseHandler}
            closeIcon={true}
          />
        )}
        {appState.triggerSignInOrSignUp && (
          <Banner
            content={tRef.current('errors.expiredSession')}
            noIcon={true}
          />
        )}
        {resetRequest === 'resolved' && bannerStatus && (
          <Banner
            content={tRef.current('messages.resetRequestSuccess')}
            closeHandler={bannerCloseHandler}
            error={false}
            closeIcon={true}
          />
        )}
        {resetRequest === 'rejected' && bannerStatus && (
          <Banner
            content={tRef.current('messages.resetRequestFail')}
            closeHandler={bannerCloseHandler}
            closeIcon={true}
          />
        )}
        {!verificationStep ? (
          <Form
            className={style.form}
            elements={formElements}
            onSubmit={handleSubmit(formData => formSubmitHandler(formData))}
          />
        ) : (
          <OTP backButtonHandler={verificationStepHandler} />
        )}

        <div className={style['logo']}>
          <Logo />
        </div>
      </div>
      <div className={style.main}>
        <div className={style.container}>
          <div className={style['image-holder']}></div>
          <div className={style['text-holder']}></div>
        </div>
      </div>
    </div>
  )
}

export default Login
