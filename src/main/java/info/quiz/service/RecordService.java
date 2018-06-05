package info.quiz.service;

import info.quiz.po.Rank;
import info.quiz.po.Record;
import info.quiz.vo.RecordVO;
import info.quiz.vo.UserStatusVO;
import java.util.List;

public abstract interface RecordService {

	/**
	 * 
	 * @param record
	 *            带保存的Record记录
	 */
	public abstract void saveRecord(Record record);

	/**
	 * 
	 * @param id
	 *            record记录的标识
	 * @return 该id所标识的Record记录
	 */
	public abstract Record getRecord(int id);

	/**
	 * 
	 * @param keyword
	 * @param page
	 * @param pageSize
	 * @param sort
	 * @param order
	 * @return
	 */
	public abstract List<RecordVO> getRecordVOs(String keyword, int page,
                                                int pageSize, String sort, String order);

	/**
	 * 
	 * @param keyword
	 *            record的字段需包含的关键词
	 * @return 字段中包含keyword的Record实例
	 */
	public abstract int getRecordCount(String keyword);

	/**
	 * 删除特定id的record实例
	 * 
	 * @param recordId
	 */
	public abstract void removeRecord(int recordId);


	/**
	 * 
	 * @param userId
	 *            用户ID
	 * @return 用户的答题状态
	 */
	public abstract List<Record> getUserRecords(int userId);

	/**
	 * 
	 * @param keyword
	 * @param page
	 * @param pageSize
	 * @param sort
	 * @param order
	 * @return
	 */
	public abstract List<Rank> getRanks(String keyword, int page, int pageSize,
										String sort, String order);

	/**
	 * 
	 * @param keyword
	 * @return 包含keyword的Rank实例数量
	 */
	public abstract int getRankCount(String keyword);

	/**
	 * 
	 * @param username
	 * @return 返回指定用户名的复赛排名
	 */
	public abstract int getRank(String username);
}