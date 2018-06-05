package info.quiz.service.impl;

import info.quiz.mapper.RecordCustomMapper;
import info.quiz.mapper.RecordMapper;
import info.quiz.po.Rank;
import info.quiz.po.Record;
import info.quiz.service.RecordService;
import info.quiz.vo.RecordVO;
import info.quiz.vo.UserStatusVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @Class: RecordServiceImpl
 * @Description:
 * @Author: Jiang Chao
 * @Date: 2018/5/18
 */
@Component
public class RecordServiceImpl implements RecordService {

    @Autowired
    private RecordMapper recordMapper;

    @Autowired
    private RecordCustomMapper recordCustomMapper;


    @Override
    public void saveRecord(Record record) {

    }

    @Override
    public Record getRecord(int id) {
        return null;
    }

    @Override
    public List<RecordVO> getRecordVOs(String keyword, int page, int pageSize, String sort, String order) {
        return null;
    }

    @Override
    public int getRecordCount(String keyword) {
        return 0;
    }

    @Override
    public void removeRecord(int recordId) {

    }

    @Override
    public List<Record> getUserRecords(int userId) {
        /*
         * 轮次应该与用户绑定；
         * 用户第一轮可以提交两次答案，取最高分;
         * 用户第二轮可以提交一次答案；
         */

        return recordCustomMapper.findRecordByUserId(userId);
    }

    @Override
    public List<Rank> getRanks(String keyword, int page, int pageSize, String sort, String order) {
        return null;
    }

    @Override
    public int getRankCount(String keyword) {
        return 0;
    }

    @Override
    public int getRank(String username) {
        return 0;
    }
}
