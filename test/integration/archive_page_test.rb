require "test_helper"

class ArchivePageTest < ActionDispatch::IntegrationTest
  test "root shows the archive shell the client script binds to" do
    get root_path
    assert_response :success
    assert_select "title", "Bookmarks de X — @thePrimeagen_sv"
    assert_select "#lede-count"
    assert_select "#load-status"
    assert_select "#type-filter"
    assert_select "#search-input"
    assert_select "#shuffle-button"
    assert_select "a[href='https://x.ai/']", text: "x.ai"
    assert_select "a[href='https://x.com/thePrimeagen_sv']", text: "@thePrimeagen_sv"
    assert_select "link[href='css/design-system.css']"
    assert_select "script[src='js/bookmarks.js']"
    assert_select "meta[name=csrf-token]", count: 0
  end

  test "markdown export is available next to the page" do
    get "/bookmarks.md"
    assert_response :success
    assert_match(/^- /, response.body)
  end
end
