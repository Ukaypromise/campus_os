class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  set_current_tenant_through_filter

  before_action :authenticate_account!

  before_action :set_current_institution

  def set_current_institution
    return unless current_account.present?
    current_institution = current_account.institution
    # set_current_tenant(current_institution)
    ActsAsTenant.current_tenant = current_institution
  end
end
