import { describe, it, expect } from 'vitest'
import { config, mount } from '@vue/test-utils'
import FilterLoanable from '../FilterLoanable.vue'

config.global.mocks.$t = (phrase) => phrase

describe('FilterLoanable', () => {
  it('renders properly', () => {
    const wrapper = mount(FilterLoanable)
    expect(wrapper.text()).toContain('filter.only_loanable') // i18n key
  })

  it('renders with an unchecked box by default', () => {
    const wrapper = mount(FilterLoanable)
    const input = wrapper.get('[data-test="input-checkbox"]')
    expect(input.element.checked).toBe(false)
  })
})
