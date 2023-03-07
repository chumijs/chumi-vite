import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    const dataRef = ref('');

    onMounted(() => {
      fetch(`/api/test/${Math.random()}?value=${Math.random()}`)
        .then((res) => res.text())
        .then((res) => {
          dataRef.value = res;
        });
    });

    return () => (
      <div>
        <p>{dataRef.value}</p>
      </div>
    );
  }
});
