require 'test_helper'

class MyfeedbackControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get mysongs" do
    get :mysongs
    assert_response :success
  end

  test "should get upload" do
    get :upload
    assert_response :success
  end

end
