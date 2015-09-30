class EquationsController < ApplicationController
  def main_page
  end

  def calculate
    a = params[:a_value]
    b = params[:b_value]
    c = params[:c_value]
    discriminant = find_discriminant(a, b, c)
    #render text: "THE DISCRIMINANT OF THE EQUATION IS #{discriminant} and the values entered are #{a}, #{b}, #{c}"
  end

  def find_discriminant(a, b, c)
    discriminant=(b*b)−(4*a*c)
  end
end
