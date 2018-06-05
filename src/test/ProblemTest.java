

import info.quiz.po.Problem;
import info.quiz.po.User;
import info.quiz.service.ProblemService;
import info.quiz.service.UserService;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;



/**
 * @Class: ProblemTest
 * @Description:
 * @Author: Jiang Chao
 * @Date: 2018/5/15
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:/config/spring/applicationContext-dao.xml"})
public class ProblemTest {

    Logger logger = Logger.getLogger(ProblemTest.class);
    @Autowired
    private ProblemService problemService;

    @Autowired
    private UserService userService;

    @Test
    public void test1(){
        Problem problem = problemService.getProblemById(1);
        System.out.println(problem.getTaskbackground());
    }

    @Test
    public void test2() throws Exception {
        User user = userService.getUser("12324", "231");
        System.out.println(user);
    }
}
