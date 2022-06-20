import {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from 'react'
import {useTranslation} from 'react-i18next'
import {useForm} from 'react-hook-form'
import PropTypes from 'prop-types'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

import {AppContext} from 'appContext'
import {Button, Input, Banner, FormErrors} from 'components'
import {post, get} from 'utils'
import {
  enOrFaNumber,
  otpTimeoutMinutes,
  otpTimeoutSeconds,
  authAccessToken,
  authRefreshToken,
  authMaxAge,
} from 'shared'

import style from './otp.module.scss'

/**
 * @params {Function} backButtonHandler
 * @params {Function} modalCloseHandler
 *
 * @returns {HTMLElement}
 */

function OTP({backButtonHandler = null, modalCloseHandler = null}) {
  const initialStates = useMemo(
    () => ({
      status: 'idle',
      bannerStatus: false,
      counter: {min: otpTimeoutMinutes, sec: otpTimeoutSeconds},
      counterText: '',
      httpRequestErrors: {},
    }),
    [],
  )

  const {appState, setAppState} = useContext(AppContext)

  const [state, setState] = useState(initialStates)

  const {t} = useTranslation()
  const navigate = useNavigate()
  const [, setCookie] = useCookies()
  const {
    register,
    handleSubmit,
    formState: {errors},
    setFocus,
  } = useForm()

  const tRef = useRef(t)
  const submitButtonRef = useRef()
  const setCookieRef = useRef(setCookie)
  const setAppStateRef = useRef(setAppState)
  const serializedMobileRef = useRef(appState.mobile?.replace(/^0/, '98'))

  const {status, counter, bannerStatus, counterText, httpRequestErrors} = state

  const formattedMobile = useMemo(
    () =>
      appState.mobile
        ? `${appState.mobile.slice(7, 11)}-${appState.mobile.slice(
            4,
            7,
          )}-${appState.mobile.slice(0, 4)}`
        : '',
    [appState.mobile],
  )

  const inputs = useMemo(
    () => [
      {
        id: 'input01',
        reference: {
          ...register('input01', {
            required: true,
            maxLength: 1,
            pattern: enOrFaNumber,
          }),
        },
      },
      {
        id: 'input02',
        reference: {
          ...register('input02', {
            required: true,
            maxLength: 1,
            pattern: enOrFaNumber,
          }),
        },
      },
      {
        id: 'input03',
        reference: {
          ...register('input03', {
            required: true,
            maxLength: 1,
            pattern: enOrFaNumber,
          }),
        },
      },
      {
        id: 'input04',
        reference: {
          ...register('input04', {
            required: true,
            maxLength: 1,
            pattern: enOrFaNumber,
          }),
        },
      },
      {
        id: 'input05',
        reference: {
          ...register('input05', {
            required: true,
            maxLength: 1,
            pattern: enOrFaNumber,
          }),
        },
      },
    ],
    [register],
  )

  const bannerCloseHandler = useCallback(() => {
    setState(prev => ({...prev, bannerStatus: false}))
  }, [])
  const inputChangeHandler = useCallback(
    event => {
      const {target, code} = event
      if (code === 'Backspace' || code === 'Delete') {
        switch (target.name) {
          case 'input02':
            setFocus('input01')
            break
          case 'input03':
            setFocus('input02')
            break
          case 'input04':
            setFocus('input03')
            break
          case 'input05':
            setFocus('input04')
            break
          default:
            break
        }
      } else {
        if (target.value !== '') {
          switch (target.name) {
            case 'input01':
              setFocus('input02')
              break
            case 'input02':
              setFocus('input03')
              break
            case 'input03':
              setFocus('input04')
              break
            case 'input04':
              setFocus('input05')
              break
            case 'input05':
              submitButtonRef.current
                .querySelector('button[type="submit"')
                .click()
              break
            default:
              break
          }
        }
      }
    },
    [setFocus],
  )
  const formHandler = useCallback(
    formData => {
      debugger
      setState(prev => ({...prev, status: 'pending'}))
      const data = {
        verify_otp: `${formData.input01}${formData.input02}${formData.input03}${formData.input04}${formData.input05}`,
        mobile: serializedMobileRef.current,
      }

      post({
        endpoint: 'api/user/otpreglogin/',
        body: data,
      }).then(
        response => {
          setAppStateRef.current(prev => ({
            ...prev,
            accessToken: response.token,
            refreshToken: response.refresh_token,
          }))

          setCookieRef.current(authAccessToken, response.token, {
            maxAge: authMaxAge,
            sameSite: 'lax',
            path: '/',
          })
          setCookieRef.current(authRefreshToken, response.refresh_token, {
            maxAge: authMaxAge,
            sameSite: 'lax',
            path: '/',
          })

          get({
            endpoint: 'api/user/account/',
            token: response.token,
          }).then(response => {
            setState(prev => ({...prev, status: 'resolved'}))

            setAppStateRef.current(prev => ({
              ...prev,
              userInfo: response,
              ...(!response.fully_verified && {welcomeModalStatus: true}),
            }))
            if (!response.fully_verified) {
              navigate('/auth')
            } else if (response.account_cash[0].cash === 0) {
              navigate('/profile/pay-and-transfer')
            } else if (
              response.account_cash[0].cash > 1 &&
              parseFloat(response.account_basket[0].entered_usdt) < 1
            ) {
              navigate('/profile/intelligent-basket')
            } else {
              navigate('/profile')
            }
          })
        },
        error => setState(prev => ({...prev, status: 'rejected'})),
      )
    },
    [navigate],
  )
  const sendSmsHandler = useCallback(abortController => {
    const data = {
      mobile: serializedMobileRef.current,
    }

    post({
      endpoint: 'api/user/otpreglogin/',
      body: data,
      abortController: abortController,
    }).then(
      response => {
        setState(prev => ({
          ...prev,
          counter: {min: otpTimeoutMinutes, sec: otpTimeoutSeconds},
        }))
      },
      error =>
        setState(prev => ({
          ...prev,
          httpRequestErrors: error,
          bannerStatus: true,
        })),
    )
  }, [])

  const inputErrors = useMemo(
    () => [
      (errors?.input01?.type === 'required' ||
        errors?.input02?.type === 'required' ||
        errors?.input03?.type === 'required' ||
        errors?.input04?.type === 'required' ||
        errors?.input05?.type === 'required') &&
        tRef.current('errors.required', {
          input: tRef.current('labels.confirmationCode'),
        }),
      (errors?.input01?.type === 'pattern' ||
        errors?.input02?.type === 'pattern' ||
        errors?.input03?.type === 'pattern' ||
        errors?.input04?.type === 'pattern' ||
        errors?.input05?.type === 'pattern') &&
        tRef.current('errors.number', {
          input: tRef.current('errors.number'),
        }),
      status === 'rejected' && tRef.current('errors.validationCode'),
    ],
    [
      errors?.input01?.type,
      errors?.input02?.type,
      errors?.input03?.type,
      errors?.input04?.type,
      errors?.input05?.type,
      status,
    ],
  )
  const requestErrors = useMemo(
    () => (
      <>
        {httpRequestErrors?.detail && bannerStatus && (
          <Banner
            content={httpRequestErrors.detail}
            closeHandler={bannerCloseHandler}
            closeIcon={true}
          />
        )}
      </>
    ),
    [bannerCloseHandler, bannerStatus, httpRequestErrors.detail],
  )
  const body = useMemo(
    () => (
      <>
        <p className={style.text}>
          {tRef.current('authContents.step-01.modalBody', {
            phoneNumber: formattedMobile,
          })}
        </p>
        {requestErrors}
        <div className={style.verify}>
          <div className={style['inputs-label']}>
            {tRef.current('labels.confirmationCode')}
          </div>
          <div className={style.inputs}>
            {inputs.map(input => (
              <Input
                key={input.id}
                id={input.id}
                name={input.id}
                size="small"
                maxLength="1"
                pattern="\d*"
                {...input.reference}
                onKeyUp={event => inputChangeHandler(event)}
                errorMessages={inputErrors}
                showErrorMessages={false}
              />
            ))}
          </div>
          <FormErrors errorMessages={inputErrors} />
          <div className={style.reset}>
            <Button
              className="link"
              type="button"
              text={`${tRef.current('buttons.sendCodeAgain')} ${counterText}`}
              disabled={
                counter.min === 0 && counter.sec === 0 ? '' : 'disabled'
              }
              onClick={() => sendSmsHandler()}
            />
          </div>
        </div>

        <div className={style['buttons-container']} ref={submitButtonRef}>
          {backButtonHandler ? (
            <Button
              className="secondary-outline"
              text={tRef.current('buttons.return')}
              type="button"
              onClick={() => backButtonHandler()}
            />
          ) : (
            <></>
          )}
          <Button
            className="primary large"
            type="submit"
            text={tRef.current('buttons.submitCode')}
            loading={status === 'pending'}
            disabled={status === 'pending' ? 'disabled' : false}
            onClick={handleSubmit(formData => formHandler(formData))}
          />
        </div>
      </>
    ),
    [
      backButtonHandler,
      counter.min,
      counter.sec,
      counterText,
      formHandler,
      formattedMobile,
      handleSubmit,
      inputChangeHandler,
      inputErrors,
      inputs,
      requestErrors,
      sendSmsHandler,
      status,
    ],
  )

  useEffect(() => {
    const abortController = new AbortController()

    sendSmsHandler(abortController)

    return () => abortController.abort()
  }, [sendSmsHandler])
  useEffect(() => {
    const text = !(counter.min === 0 && counter.sec === 0)
      ? `${counter.min}:${counter.sec < 10 ? `0${counter.sec}` : counter.sec}`
      : ''

    setState(prev => ({
      ...prev,
      counterText: text,
    }))

    const timeout = setTimeout(() => {
      counter.sec === 0
        ? counter.min !== 0 &&
          setState(prev => ({
            ...prev,
            counter: {min: prev.counter.min - 1, sec: 59},
            counterText: text,
          }))
        : setState(prev => ({
            ...prev,
            counter: {min: prev.counter.min, sec: prev.counter.sec - 1},
            counterText: text,
          }))

      if (counter.min === 0 && counter.sec === 0)
        setState(prev => ({...prev, counterText: text}))
    }, 1000)

    return () => clearTimeout(timeout)
  }, [counter.min, counter.sec])

  return body
}

OTP.propTypes = {
  backButtonHandler: PropTypes.func,
  modalCloseHandler: PropTypes.func,
}

export default OTP
