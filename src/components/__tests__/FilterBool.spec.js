import { describe, it, expect } from 'vitest'
import { config, mount } from '@vue/test-utils'
import FilterBool from '../FilterBool.vue'

config.global.mocks.$t = (phrase) => phrase

describe('FilterBool', () => {
  it('renders properly', () => {
    const wrapper = mount(FilterBool, { props: { title: 'field', checked: true } })
    expect(wrapper.text()).toContain('field')
  })

  it('renders with a checked box', () => {
    const wrapper = mount(FilterBool, { props: { title: 'field', checked: true } })
    const input = wrapper.get('[data-test="input-checkbox"]')
    expect(input.element.checked).toBe(true)
  })

  it('renders with an unchecked box', () => {
    const wrapper = mount(FilterBool, { props: { title: 'field', checked: false } })
    const input = wrapper.get('[data-test="input-checkbox"]')
    expect(input.element.checked).toBe(false)
  })

  it('emits an event when clicked', () => {
    const wrapper = mount(FilterBool, { props: { title: 'field', checked: true } })
    const input = wrapper.get('[data-test="input-checkbox"]')
    input.setValue(false)
    expect(wrapper.emitted()).toHaveProperty('toggle')
  })
})
