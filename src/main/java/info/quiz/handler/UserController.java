package info.quiz.handler;

import info.quiz.po.Record;
import info.quiz.po.User;
import info.quiz.service.RecordService;
import info.quiz.service.UserService;
import info.quiz.util.QuizProperties;
import info.quiz.vo.RecordPairs;
import info.quiz.vo.UserStatusVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.annotation.SessionScope;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @Class: UserController
 * @Description:
 * @Author: Jiang Chao
 * @Date: 2018/5/16
 */
@Controller
@SessionScope
public class UserController {
    private int id = 0;
    @Autowired
    private UserService userService;

    @Autowired
    private RecordService recordService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public @ResponseBody String registerUser(@RequestBody User user){
        // 先查找username是否存在？存在返回失败
        String msg;
        String username = user.getUsername();

        // 所有注册用户为非管理员
        user.setIsadmin(false);
        try {
            User userByName = userService.getUserByName(username);
            if (userByName != null) msg = "username exists";
            else {
                // 设置注册时间
                user.setRegistertime(new Date());
                userService.saveUser(user);
                msg = "success";
            }
        } catch (Exception e) {
            msg = "failure, database problem";
        }
        return msg;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody User login(@RequestBody User user, HttpSession httpSession){
        String username = user.getUsername();
        String password = user.getPassword();
        User userFromDatabase;
        try {
            userFromDatabase = userService.getUser(username, password);
            if (userFromDatabase != null) {
                httpSession.setAttribute("user", userFromDatabase);
            }
        } catch (Exception e) {
            e.printStackTrace();
            // 设置出错的用户id为-1
            userFromDatabase = new User();
            userFromDatabase.setId(-1);
        }
        System.out.println(this);
        System.out.println("用户登陆" + (++id));
        return userFromDatabase;
    }


    @RequestMapping(value = "/logout")
    public String logout(HttpSession session) throws Exception{
        session.invalidate();
        return "redirect: login.jsp";
    }

    @RequestMapping("/getCurrentUser")
    @ResponseBody
    public User getCurrentUser(HttpSession session) {
            User user = (User) session.getAttribute("user");
            return user;
    }

    @RequestMapping("/getCurrentUserStatus")
    @ResponseBody
    public UserStatusVO getCurrentUserStatus(HttpSession session) throws Exception {
        
        UserStatusVO statusVO = new UserStatusVO();
        User user = (User) session.getAttribute("user");
        int id = user.getId();
        List<Record> records = recordService.getUserRecords(id);
        int round = userService.getUserRound(id);

        statusVO.setRound(round);
        int answerCount = statusVO.getAnswerCount();

        // 获得分数，填入状态statusVO
        List<RecordPairs> scores = new ArrayList<>();
        for (Record r : records)
        {
            RecordPairs pairs = new RecordPairs(r.getRound(), r.getSumscore());
            scores.add(pairs);
            if (answerCount < r.getCount()) answerCount = r.getCount();
        }
        statusVO.setAnswerCount(answerCount);
        statusVO.setScores(scores);

        if (round == 0) {
            // 新用户
            statusVO.setRoundAllowed(true);
        }
        else if (round == 1){
            /*
             * 初赛，初赛什么要求?
             * 第一轮，所有新用户( round = 0 ), 可以答题; 和round = 1 and count < 2
             */
            int primaryAnswerNum = 2;
            String prop;
            if ((prop = QuizProperties.getProperties("PrimaryAnswerNum")) != null){
                primaryAnswerNum = Integer.parseInt(prop);
            }
            if (statusVO.getAnswerCount() < primaryAnswerNum){
                statusVO.setRoundAllowed(true);
            }
        }
        else if(round == 2) {
            /*
             * 复赛有何要求？...
             * 第二轮，用户初赛（round = 1) 名次达到某标准或分数达到某标准（配置文件），可以答题
             */
            if (Boolean.valueOf(QuizProperties.getProperties("SecondaryUseRank"))){
                // 使用rank
                int rank = Integer.parseInt(QuizProperties.getProperties("SecondaryUseRank"));
            }
            else if(Boolean.valueOf(QuizProperties.getProperties("SecondaryUseScores"))){
                // 使用scores
            }


        }
        return statusVO;
    }
}
