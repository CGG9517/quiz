package info.quiz.util;

import java.io.*;
import java.util.Properties;

/**
 * @Class: QuizProperties
 * @Description:
 * @Author: Jiang Chao
 * @Date: 2018/5/18
 */
public class QuizProperties {
    private static Properties props = new Properties();
    private static Properties getProperties(){

        try {
            InputStream in = new BufferedInputStream(
                    new FileInputStream("src/main/resources/config/quizConfig.properties"));

            props.load(in);

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return props;
    }

    public static String getProperties(String key){
        return getProperties().getProperty(key);
    }

    public static void main(String[] args) {
        Properties props = getProperties();
        System.out.println(Integer.parseInt(props.getProperty("PrimaryAnswerNum")));

    }
}
