function Picture({src, alt, srcSet = [], ...rest}) {
  return (
    <picture>
      {srcSet.map((srcSetItem, index) => (
        <source
          key={`${srcSetItem}-${index}`}
          srcSet={srcSetItem}
          type={`image/${srcSetItem.split('.').pop()}`}
        />
      ))}
      <img src={src} alt={alt} {...rest} />
    </picture>
  )
}

export default Picture
