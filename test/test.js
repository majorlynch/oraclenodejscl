import assert from 'assert';

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
      assert.notEqual(1,2)
      assert.ok(true);
    });

    it('should be ok', function () {
      assert.ok(true);
    });

    it('should be equal', function () {
      assert.equal(1, '1');
    });

    it('should be equal calc', function () {
      assert.equal(3, 4-1);
    });

    it('should not be strictequal', function () {
      assert.notStrictEqual(1, '1');
    });

    it('should compare objects', function () {
      const ob1 = { firstName: 'Conor', lastName: 'Lynch', hobby: 'Reading' };
      assert.deepStrictEqual(ob1, { firstName: 'Conor', lastName: 'Lynch', hobby: 'Reading' });
    });

    it('should compare array', function () {
      const arr1 = [[[[1]]]];
      assert.deepStrictEqual(arr1, [[[[1]]]]);
      assert.notDeepStrictEqual([1], [[[[1]]]]);
    });

  });
});