package info.quiz.mapper;

import info.quiz.po.Rank;
import java.util.List;

public interface RankMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table rank
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(String username);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table rank
     *
     * @mbg.generated
     */
    int insert(Rank record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table rank
     *
     * @mbg.generated
     */
    Rank selectByPrimaryKey(String username);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table rank
     *
     * @mbg.generated
     */
    List<Rank> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table rank
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(Rank record);
}