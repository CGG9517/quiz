package info.quiz.service.impl;

import info.quiz.mapper.UserCustomMapper;
import info.quiz.mapper.UserMapper;
import info.quiz.po.User;
import info.quiz.service.UserService;
import info.quiz.util.Encryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @Class: UserServiceImpl
 * @Description:
 * @Author: Jiang Chao
 * @Date: 2018/5/16
 */
@Component
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserCustomMapper userCustomMapper;

    @Override
    public void saveUser(User user) throws Exception {
        String password = Encryptor.md5(user.getPassword());
        user.setPassword(password);
        userCustomMapper.insertUser(user);
    }

    @Override
    public User getUser(String userName, String password) throws Exception {
        password = Encryptor.md5(password);
        User user = userCustomMapper.findUserByUsernamePassword(userName, password);
        return user;
    }

    @Override
    public List<User> getUsers(String keyword, int page, int pageSize, String sort, String order) {

        return null;
    }

    @Override
    public int getUserCount(String paramString) {

        return 0;
    }

    @Override
    public void removeUser(int paramInt) {
        userMapper.deleteByPrimaryKey(paramInt);
    }

    @Override
    public void resetPassword(String username, String password) throws Exception {
        password = Encryptor.md5(password);
        User user = getUserByName(username);
        user.setPassword(password);
        userMapper.updateByPrimaryKey(user);
    }

    @Override
    public int getUserRound(int id) throws Exception {
        return userMapper.selectByPrimaryKey(id).getRound();
    }

    @Override
    public User getUserByPhone(String phone) {
        return null;
    }

    @Override
    public User getUserByName(String username) throws Exception{
        return userCustomMapper.findUserByUsername(username);
    }
}
