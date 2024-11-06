package yourstyle.com.shope.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import yourstyle.com.shope.model.Size;
import yourstyle.com.shope.repository.SizeRepository;
import yourstyle.com.shope.service.SizeService;

@Service
public class SizeServiceImpl implements SizeService{
    
    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public void deleteById(Integer id) {
        sizeRepository.deleteById(id);
    }

    @Override
    public long count() {
        return sizeRepository.count();
    }

    @Override
    public Optional<Size> findById(Integer id) {
        return sizeRepository.findById(id);
    }

    @Override
    public List<Size> findAll() {
        return sizeRepository.findAll();
    }

    @Override
    public Page<Size> findAll(Pageable pageable) {
        return sizeRepository.findAll(pageable);
    }

    @Override
    public List<Size> findAll(Sort sort) {
        return sizeRepository.findAll(sort);
    }

    @Override
    public <S extends Size> Optional<S> findOne(Example<S> example) {
        return sizeRepository.findOne(example);
    }

    @Override
    public <S extends Size> S save(S entity) {
        return sizeRepository.save(entity);
    }

    @Override
    public Size update(Size size) {
        if (sizeRepository.existsById(size.getSizeId())) {
            return sizeRepository.save(size);
        } else {
            throw new IllegalArgumentException("Size not found with id: " + size.getSizeId());
        }
    }

}