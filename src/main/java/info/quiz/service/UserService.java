package info.quiz.service;

//import info.quiz.util.Encryptor;

import info.quiz.po.User;

import java.util.List;

public abstract interface UserService {

	/**
	 * 保存用户信息,并采用 Encryptor类,以MD5算法对用户密码进行加密
	 * 
	 * @param user
	 *            需要保存的用户实例
	 */
	public abstract void saveUser(User user) throws Exception;

	/**
	 * 
	 * @param userName
	 *            用户名
	 * @param password
	 *            登录密码
	 * @return <code> 用户名存在且密码正确 : <b>true</b> ; 否则  : <b>false</b> <code>
	 */
	public abstract User getUser(String userName, String password) throws Exception;

	/**
	 * 
	 * @param keyword
	 * @param page
	 * @param pageSize
	 * @param sort
	 * @param order
	 * @return
	 */
	public abstract List<User> getUsers(String keyword, int page, int pageSize,
                                        String sort, String order) throws Exception;

	public abstract int getUserCount(String paramString) throws Exception;

	public abstract void removeUser(int paramInt) throws Exception;

	public abstract void resetPassword(String username, String password) throws Exception;
	public abstract int getUserRound(int id) throws Exception;
	/**
	 * 
	 * @param phone
	 * @return
	 */
	public abstract User getUserByPhone(String phone) throws Exception;

	User getUserByName(String username) throws Exception;
}
