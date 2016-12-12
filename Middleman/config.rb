###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration
config[:js_dir] = 'assets/js'
config[:css_dir] = 'assets/css'
config[:images_dir] = 'assets/img'
config[:fonts_dir] = 'assets/fonts'

set :slim, {format: :html, pretty: true}
Slim::Engine.set_options({attr_list_delims: {'(' => ')', '[' => ']', '{' => '}'}})

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def title
    if current_page.data.title
      "#{current_page.data.title} | Middleman"
    else
      "Middleman"
    end
  end

  def link_to *args, &block
    url_args_index = block_given? ? 0 : 1
    if url = args[url_args_index]
      agrs[url_args_index] << '.html' if !url.starts_with?('http') && !url.ends_with?('/')
    end
    super(*args, &block)
  end
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
