package info.quiz.mapper;

import info.quiz.po.User;
import org.apache.ibatis.annotations.Param;

public interface UserCustomMapper {
    User findUserByUsernamePassword(
            @Param("userName") String userName,
            @Param("password") String password) throws Exception;

    User findUserByUsername(String username) throws Exception;
    void insertUser(User user) throws Exception;
}