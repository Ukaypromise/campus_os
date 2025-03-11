# frozen_string_literal: true

class AddButtonComponent < ViewComponent::Base
  include IconHelper

  def initialize(path:, text:, icon: nil, css_class: nil)
    @path = path
    @text = text
    @icon = icon
    @css_class = default_classes
  end

  def default_classes
    "inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
  end
end
