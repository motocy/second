package com.suwon.ezen.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suwon.ezen.mapper.DataMapper;
import com.suwon.ezen.vo.UserVO;

import lombok.Setter;

@Service
public class DataServiceImpl implements DataService {
	@Setter(onMethod_ = @Autowired)
	private DataMapper mapper;
	
	// 사용자의 데이터 가져오기
	@Override
	public UserVO getUserInfo(String pointer) {
		UserVO vo = mapper.getUserInfo(pointer);
		
		return vo;
	}

	// 사용자의 tilt 테이블에서 column명 가져오기
	@Override
	public List<String> getTiltColumn(String tiltName) {
		List<String> result = mapper.getTiltColumn(tiltName);
		
		return result;
	}

	// 전체 데이터 가져오기
	@Override
	public List<Map<String, String>> getTable(UserVO info, List<String> columnList) {
		List<Map<String, String>> map = mapper.getTable(info, columnList);
		
		return map;
	}

	@Override
	public String getPassword(String tiltName) {
		
		return mapper.getPassword(tiltName);
	}

}
