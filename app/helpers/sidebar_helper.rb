module SidebarHelper
  def sidebar_menu_link(path, icon, label, options = {}, &block)
    css_class = "group flex items-center gap-x-3 rounded-lg p-2 text-sm leading-6 font-medium " +
                (current_page?(path) ? "bg-gray-50 text-purple-600" : "text-gray-700 hover:text-purple-600 hover:bg-gray-50")

    link_to path, class: css_class do
      concat(icon)
      if block_given?
        concat(capture(&block))
      else
        concat(label)
      end
    end
  end
end
