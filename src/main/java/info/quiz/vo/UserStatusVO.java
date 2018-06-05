package info.quiz.vo;

import java.util.ArrayList;
import java.util.List;

/**
 * @Class: UserStatusVO
 * @Description:
 * @Author: Jiang Chao
 * @Date: 2018/5/15
 */
public class UserStatusVO {
    /*
     * 新用户轮次0, 初赛1，复赛2；
     */
    int round = -1;
    // 答题次数
    int answerCount = 0;

    // 所有轮次比赛数据
    List<RecordPairs> scores = new ArrayList<>();

    // 轮次是否允许
    boolean isRoundAllowed = false;

    public int getAnswerCount() {
        return answerCount;
    }

    public void setAnswerCount(int answerCount) {
        this.answerCount = answerCount;
    }



    public int getRound() {
        return round;
    }

    public void setRound(int round) {
        this.round = round;
    }

    public List<RecordPairs> getScores() {
        return scores;
    }

    public void setScores(List<RecordPairs> scores) {
        this.scores = scores;
    }

    public boolean isRoundAllowed() {
        return isRoundAllowed;
    }

    public void setRoundAllowed(boolean roundAllowed) {
        isRoundAllowed = roundAllowed;
    }
}

