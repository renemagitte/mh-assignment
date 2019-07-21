'use strict';

// jshint expr: true

var chai = require('chai'),
    sinon = require('sinon'),
    should = chai.should(),
    expect = chai.expect;



function isEven(num) {
    return num % 2 === 0;
}

describe('isEven', function() {
    it('should return true when number is even', function() {
        isEven(4).should.be.true;
    });

    it('should return false when number is odd', function() {
        expect(isEven(5)).to.be.false;
    })
});


describe('sinon tests', function() {
    var student;
    var schedule;

    this.beforeEach(function() {
        student = {
            dropClass: function(classId, cb) {
                // do stuff
                if(!!cb.dropClass) {
                    cb.dropClass();
                }else{
                    cb();
                }
            },
            addClass: function(schedule){
                return true;
            }
        };

        schedule = {
            dropClass: function() {
                console.log('class dropped');
            },
            classIsFull: function() {
                return true;
            }
        }
    });

    describe('student.dropClass', function() {
        it('should call the callback', function() {
            var spy = sinon.spy();
            student.dropClass(1, spy);
            spy.called.should.be.true;
        });

        it('should call the callback and log to the console', function() {
            function onClassDropped() {
                console.log("onClassDropped was called")
            }
            var spy = sinon.spy(onClassDropped);
            student.dropClass(1, spy);
            spy.called.should.be.true;
        });

        it('should call the callback even if it\'s a mthod of an object', function() {
            sinon.spy(schedule, 'dropClass');
            student.dropClass(1, schedule);
            schedule.dropClass.called.should.be.true;
        });

    });

    describe('student with stubs', function() {
        it('should call a stubbed method', function() {
            var stub = sinon.stub(schedule);
            student.dropClass(1, stub.dropClass);
            stub.dropClass.called.should.be.true;

        });

        it('should return true when the class is not full', function() {
            var stub = sinon.stub(schedule);
            stub.classIsFull.returns(false);
            var returnVal = student.addClass(schedule);
            returnVal.should.be.true;
        })
    });

    describe('student with mocks', function() {
        it('mocks schedule', function() {
            var mockObj = sinon.mock(schedule);
            var expectation = mockObj.expects('classIsFull').once();
            student.addClass(schedule);
            expectation.verify();
        })
    })
});