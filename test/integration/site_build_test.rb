require "test_helper"
require "rake"

class SiteBuildTest < ActiveSupport::TestCase
  test "writes a static archive with relative assets and the markdown export" do
    Rails.application.load_tasks
    Rake::Task["site:build"].reenable
    Rake::Task["site:build"].invoke

    html = File.read(Rails.root.join("build/index.html"))
    assert_includes html, "css/design-system.css"
    assert_includes html, "js/bookmarks.js"
    assert_includes html, 'id="lede-count"'
    assert_includes html, "Todos los bookmarks"
    refute_includes html, "/assets/"
    refute_includes html, "csrf-token"
    assert File.exist?(Rails.root.join("build/bookmarks.md"))
    assert File.exist?(Rails.root.join("build/.nojekyll"))
  end
end
