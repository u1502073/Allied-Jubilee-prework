module.exports = ({ file, options, env }) => {
  const cssnext = options.reactToolboxVariables
    ? {
      features: {
        customProperties: {
          variables: options.reactToolboxVariables,
        },
      },
    }
    : {}

  return {
    plugins: {
      'postcss-import': {
        root: __dirname,
      },
      'postcss-preset-env': cssnext,
    },
  }
}
