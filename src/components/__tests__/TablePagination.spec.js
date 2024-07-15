import { describe, it, expect } from 'vitest'
import { config, mount } from '@vue/test-utils'
import TablePagination from '../TablePagination.vue'
import { PAGE_RANGE } from '../../config.js'

config.global.mocks.$t = (phrase) => phrase

const nbButtonPage = (p, total) => Math.min(p - 1, PAGE_RANGE) + 1 + Math.min(total - p, PAGE_RANGE)

describe('TablePagination', () => {
  it('renders properly if 1/1', () => {
    const wrapper = mount(TablePagination, {
      props: { page: 1, nbPage: 1 }
    })
    const length = 1
    expect(wrapper.findAll('[data-test="page-button"]')).toHaveLength(length)
  })

  it('renders properly if 1/2', () => {
    const wrapper = mount(TablePagination, {
      props: { page: 1, nbPage: 2 }
    })
    const length = 2
    expect(wrapper.findAll('[data-test="page-button"]')).toHaveLength(length)
  })

  it('renders properly if 1/20', () => {
    const wrapper = mount(TablePagination, {
      props: { page: 1, nbPage: 20 }
    })
    const length = nbButtonPage(1, 20)
    expect(wrapper.findAll('[data-test="page-button"]')).toHaveLength(length)
  })

  it('renders properly if 4/20', () => {
    const wrapper = mount(TablePagination, {
      props: { page: 4, nbPage: 20 }
    })
    const length = nbButtonPage(4, 20)
    expect(wrapper.findAll('[data-test="page-button"]')).toHaveLength(length)
  })

  it('renders properly if 5/20', () => {
    const wrapper = mount(TablePagination, {
      props: { page: 5, nbPage: 20 }
    })
    const length = nbButtonPage(5, 20)
    expect(wrapper.findAll('[data-test="page-button"]')).toHaveLength(length)
  })

  it('renders properly if 17/20', () => {
    const wrapper = mount(TablePagination, {
      props: { page: 17, nbPage: 20 }
    })
    const length = nbButtonPage(17, 20)
    expect(wrapper.findAll('[data-test="page-button"]')).toHaveLength(length)
  })

  it('renders properly if 18/20', () => {
    const wrapper = mount(TablePagination, {
      props: { page: 18, nbPage: 20 }
    })
    const length = nbButtonPage(18, 20)
    expect(wrapper.findAll('[data-test="page-button"]')).toHaveLength(length)
  })

  it('renders properly if 19/20', () => {
    const wrapper = mount(TablePagination, {
      props: { page: 19, nbPage: 20 }
    })
    const length = nbButtonPage(19, 20)
    expect(wrapper.findAll('[data-test="page-button"]')).toHaveLength(length)
  })

  it('renders properly if 20/20', () => {
    const wrapper = mount(TablePagination, {
      props: { page: 20, nbPage: 20 }
    })
    const length = nbButtonPage(20, 20)
    expect(wrapper.findAll('[data-test="page-button"]')).toHaveLength(length)
  })
})
