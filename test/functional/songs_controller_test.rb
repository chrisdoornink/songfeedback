require 'test_helper'

class SongsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get recent" do
    get :recent
    assert_response :success
  end

  test "should get least_rated" do
    get :least_rated
    assert_response :success
  end

  test "should get top" do
    get :top
    assert_response :success
  end

  test "should get random" do
    get :random
    assert_response :success
  end

  test "should get genre" do
    get :genre
    assert_response :success
  end

end
