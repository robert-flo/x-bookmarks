namespace :site do
  desc "Write the static archive into build/"
  task build: :environment do
    require "fileutils"

    out = Rails.root.join("build")
    FileUtils.rm_rf(out)
    FileUtils.mkdir_p(out.join("css"))
    FileUtils.mkdir_p(out.join("js"))

    html = ApplicationController.render(template: "bookmarks/index", layout: "application")
    File.write(out.join("index.html"), html)
    FileUtils.cp Rails.root.join("public/css/design-system.css"), out.join("css/design-system.css")
    FileUtils.cp Rails.root.join("public/css/bookmarks.css"), out.join("css/bookmarks.css")
    FileUtils.cp Rails.root.join("public/js/design-system.js"), out.join("js/design-system.js")
    FileUtils.cp Rails.root.join("public/js/bookmarks.js"), out.join("js/bookmarks.js")
    FileUtils.cp Rails.root.join("bookmarks.md"), out.join("bookmarks.md")
    File.write(out.join(".nojekyll"), "")
  end
end
