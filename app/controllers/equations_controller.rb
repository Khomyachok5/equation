class EquationsController < ApplicationController
  def main_page
  end

  def calculate
    render text: "THE VALUES ENTERED ARE #{params[:values]}"
  end
end
