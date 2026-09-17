Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  get "bookmarks.md", to: "bookmarks#source"
  root "bookmarks#index"
end
