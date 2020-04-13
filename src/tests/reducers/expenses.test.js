import expensesReducer from '../../reducers/expenses'
import { TestScheduler } from 'jest'
import expenses from '../fixtures/expenses'
import moment from 'moment'

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('Should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('Should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ expenses[0], expenses[1], expenses[2]])
})

test('Should add an expense', () => {
    const expense = {
        id: '4',
        description: 'Food',
        note: '',
        amount: 5409,
        createdAt: moment()
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action)    
    expect(state).toEqual([...expenses, expense])
})

test('Should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '4',
        updates: {
            description: 'Rental'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses.filter(({id}) => id !== action.id))
})

test('Should not edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '4',
        updates: {
            description: 'Rental Agreement'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})