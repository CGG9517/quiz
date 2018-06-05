package info.quiz.service;

import info.quiz.po.Problem;

import java.util.List;

public abstract interface ProblemService {

	public abstract void saveOrUpdate(Problem paramProblem);

	public abstract void save(Problem paramProblem);

	public abstract void delete(int paramInt);

	public abstract List<Problem> get(String paramString1, int paramInt1,
                                      int paramInt2, int paramInt3, int paramInt4, String paramString2,
                                      String paramString3);

	public abstract int getCount(String paramString, int paramInt1,
                                 int paramInt2);
	public abstract Problem getProblemById(int id);
}