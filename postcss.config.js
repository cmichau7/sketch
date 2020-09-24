const prod = process.env.NODE_ENV === "production"

module.exports = {
  plugins: [
    require("postcss-import")(),
    require("tailwindcss"),
    require("autoprefixer"),
    ...(prod
      ? [
        require("cssnano")(),
        require("@fullhuman/postcss-purgecss")({
          content: ["./**/*.html", "./**/*.svelte"],
          defaultExtractor: (content) =>
            content.match(/[A-Za-z0-9-_:/]+/g) || [],
        }),
      ]
      : []
    ),
  ]
}