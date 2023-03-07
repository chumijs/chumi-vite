import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    const dataRef = ref('');

    onMounted(() => {
      fetch('/api/test', {
        method: 'POST',
        body: JSON.stringify({ name: Math.random() }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((res) => res.text())
        .then((res) => {
          dataRef.value = res;
        });
    });

    return () => {
      return (
        <div>
          <h1>404</h1>
          <p>{dataRef.value}</p>
        </div>
      );
    };
  }
});
