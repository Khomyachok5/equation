class EquationsController < ApplicationController
  def main_page
  end

  def calculate
    a = params[:a_value]
    b = params[:b_value]
    c = params[:c_value]
    #render text: "THE VALUES ENTERED ARE #{a}, #{b}, #{c}"
  end
end
