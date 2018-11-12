import { shallowMount } from '@vue/test-utils';
import CreateToDo from '@/components/CreateToDo.vue';

describe('CreateToDo.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(CreateToDo, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
