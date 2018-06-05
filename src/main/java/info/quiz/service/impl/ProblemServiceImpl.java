package info.quiz.service.impl;

import info.quiz.mapper.ProblemMapper;
import info.quiz.po.Problem;
import info.quiz.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @Class: ProblemServiceImpl
 * @Description:
 * @Author: Jiang Chao
 * @Date: 2018/5/15
 */

@Component
public class ProblemServiceImpl implements ProblemService {

    @Autowired
    private ProblemMapper problemMapper;

    @Override
    public void saveOrUpdate(Problem paramProblem) {

    }

    @Override
    public void save(Problem paramProblem) {

    }

    @Override
    public void delete(int paramInt) {

    }

    @Override
    public List<Problem> get(String paramString1, int paramInt1, int paramInt2, int paramInt3, int paramInt4, String paramString2, String paramString3) {
        return null;
    }

    @Override
    public int getCount(String paramString, int paramInt1, int paramInt2) {
        return 0;
    }

    @Override
    public Problem getProblemById(int id) {
        Problem problem = problemMapper.selectByPrimaryKey(id);
        return problem;
    }

}
