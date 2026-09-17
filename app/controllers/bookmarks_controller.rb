class BookmarksController < ApplicationController
  def index
  end

  def source
    send_file Rails.root.join("bookmarks.md"), type: "text/markdown; charset=utf-8", disposition: "inline"
  end
end
