package info.quiz.util;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @Class: Encryptor
 * @Description:
 * @Author: Jiang Chao
 * @Date: 2018/5/18
 */
public class Encryptor {
    /**
     * 将字符串以MD5方式将用户输入的密码字符串进行加密;
     * @param s 待加密的字符串;
     * @return 经过MD5加密后的字符串.
     */
    public static String md5(String s)
    {
        try {

            MessageDigest messageDigest = MessageDigest.getInstance("MD5");
            BASE64Encoder base64encoder = new BASE64Encoder();
            return base64encoder.encode(
                    messageDigest.digest(s.getBytes()));

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return s;
    }
}
