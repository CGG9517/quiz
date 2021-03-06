package info.quiz.mapper;

import info.quiz.po.Problem;
import java.util.List;

public interface ProblemMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table problem
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table problem
     *
     * @mbg.generated
     */
    int insert(Problem record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table problem
     *
     * @mbg.generated
     */
    Problem selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table problem
     *
     * @mbg.generated
     */
    List<Problem> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table problem
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(Problem record);
}