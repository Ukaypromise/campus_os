module ApplicationHelper
  ROLE_MAPPING = {
    employee: { abbr: "EM", text_color: "text-cyan-600", bg_color: "bg-cyan-100" },
    agent: { abbr: "AG", text_color: "text-blue-600", bg_color: "bg-blue-100" },
    agency_admin: { abbr: "AA", text_color: "text-orange-600", bg_color: "bg-orange-100" }
  }.freeze

  def status_badge(resource)
    status = resource.is_a?(String) ? resource : resource.status

    case status
    when "registered"
      content_tag(:span, "Registered", class: "inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10")
    when "enrolled"
      content_tag(:span, "Enrolled", class: "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20")
    when "rejected"
      content_tag(:span, "Rejected", class: "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10")
    when "pending"
      content_tag(:span, "Pending", class: "inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10")
    when "Not Invited"
      content_tag(:span, "Not Invited", class: "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-500/10")
    when "active"
      content_tag(:span, "Active", class: "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20")
    when "inactive"
      content_tag(:span, "Inactive", class: "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10")
    when "error"
      content_tag(:span, "Error", class: "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10")
    else
      content_tag(:span, "Incomplete", class: "inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20")
    end
  end

  def avatar_with_initials(resource)
    content_tag(:div, resource.initials, class: "h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-medium text-white", style: "background-color: #{Tailwindcss::Utils.random_bg_color(resource.id)}")
  end

  def resource_first_name(resource)
    if resource.respond_to?(:employee) && resource.employee.present?
      resource.employee.first_name
    elsif resource.respond_to?(:agent) && resource.agent.present?
      resource.agent.first_name
    else
      resource.email
    end
  end

  def render_flash_notifications
    notifications = flash.flat_map do |type, message_or_messages|
      Array(message_or_messages).map do |message|
        render partial: "shared/notification", locals: { type: type, message: message }
      end
    end

    safe_join(notifications)
  end

  def form_error_messages(object, attribute)
    return unless object.errors[attribute].any?

    content_tag(:p, object.errors[attribute].join(", "), class: "mt-2 text-sm text-red-600")
  end

  def role_badge(account)
    return unless account

    role = determine_role(account)
    return unless role

    content_tag(:div, class: "flex h-8 w-8 items-center justify-center rounded-full #{ROLE_MAPPING[role][:bg_color]}", alt: ROLE_MAPPING[role][:abbr]) do
      content_tag(:span, ROLE_MAPPING[role][:abbr], class: "text-sm font-medium #{ROLE_MAPPING[role][:text_color]}")
    end
  end

  def determine_role(account)
    if account
      :employee
    end
  end
end
