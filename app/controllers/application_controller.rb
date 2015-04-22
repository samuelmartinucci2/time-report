class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::MimeResponds

  def self.respond_to(*mimes)
    include ActionController::RespondWith::ClassMethods
  end
end
