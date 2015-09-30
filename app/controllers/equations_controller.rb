class EquationsController < ApplicationController
  include Math
  def main_page
  end

  def calculate
    a = params[:a_value].to_i
    b = params[:b_value].to_i
    c = params[:c_value].to_i
    discriminant = find_discriminant(a, b, c)
    if discriminant < 0
      @answer =  "The discriminant of the equation is negative, there are no roots"
    else
      case
        when discriminant > 0
          x1 = (-b + sqrt(discriminant)) / 2*a
          x2 = (-b - sqrt(discriminant)) / 2*a
          @answer =  "THE DISCRIMINANT OF THE EQUATION IS #{discriminant} and the values entered are #{a}, #{b}, #{c}. The roots of the equation are #{x1} and #{x2}"
        when discriminant == 0
          x1 = (-b + sqrt(discriminant)) / 2*a
          @answer =  "THE DISCRIMINANT OF THE EQUATION IS #{discriminant} and the values entered are #{a}, #{b}, #{c}. The root of the equation is #{x1}"
      end
    end
  end

  def find_discriminant(a, b, c)
    discriminant=(b*b)-(4*a*c)
  end
end
