package info.quiz.mapper;

import info.quiz.po.Record;

import java.util.List;

/**
 * @Class: RecordCustomMapper
 * @Description:
 * @Author: Jiang Chao
 * @Date: 2018/5/18
 */
public interface RecordCustomMapper {
    List<Record> findRecordByUserId(int userId);
}
