import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

/**
 * 인증 및 권한 검사를 수행하는 컴포넌트.
 *
 * @param {Component} SpecificComponent - 검사를 수행할 컴포넌트
 * @param {boolean|null} option - 페이지 접근 옵션
 * @param {boolean|null} adminRoute - 관리자 권한이 필요한 페이지 여부
 */

// 변수명 생성 or 주석 달기
// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
  // option === null -> 아무나 출입이 가능한 페이지
  // option === true -> 로그인한 유저만 출입이 가능한 페이지
  // option === false -> 로그인한 유저는 출입 불가능한 페이지

  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res);

        // 로그인 하지 않은 상태
        if (!res.payload.isAuth) {
          if (option) {
            navigation("/login");
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !res.payload.isAdmin) {
            navigation("/");
          } else {
            if (option === false) {
              navigation("/");
            }
          }
        }
      });
    }, [dispatch, navigation]);

    return <SpecificComponent />;
  }
  return <AuthenticationCheck />;
}
