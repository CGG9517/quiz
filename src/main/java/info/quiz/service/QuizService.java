package info.quiz.service;

import info.quiz.vo.AnswerVO;
import info.quiz.vo.QuizVO;
import info.quiz.vo.ResultVO;

public abstract interface QuizService {
	/**
	 * 
	 * @param userId
	 * @return 为指定用户返回答题列表.答题列表随机生成。可以指定难度比例
	 */
	public abstract QuizVO getQuiz(int userId);

	/**
	 * 
	 * @param userID
	 *            答题用户ID
	 * @param answer
	 *            用户每题的答案
	 * @return
	 */
	public abstract ResultVO getResult(int userID, AnswerVO answer);

	/**
	 * 取得所有在库的题目 用于测试题目是否符合规范
	 * 
	 * @return
	 */
	public abstract QuizVO getQuizWithAllProblems();

	/**
	 * 按照题目ID顺序 分页返回题目列表 用于测试题目是否符合规范
	 * 
	 * @param startOffset
	 * @param count
	 * @return
	 */
	public abstract QuizVO getQuizWithProblems(int startOffset, int count);
}