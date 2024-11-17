<template>
  <div>
    <!-- 如果 countryCode 存在，展示评论输入和列表 -->
    <div v-if="countryCode">
      <input
        v-model="newComment"
        type="text"
        placeholder="Write your cheer!"
        @keyup.enter="addComment"
      />
      <button @click="addComment">Add Comment</button>
      <ul>
        <li v-for="(comment, index) in comments" :key="index">{{ comment }}</li>
      </ul>
    </div>
    <!-- 如果 countryCode 不存在，展示提示 -->
    <p v-else>Please select a country to add comments.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CommentSection',
  props: {
    countryCode: {
      type: String,
      required: false, // 设置为可选
    },
  },
  setup(props) {
    const comments = ref<string[]>([]);
    const newComment = ref('');

    const addComment = () => {
      if (newComment.value.trim()) {
        comments.value.push(newComment.value);
        newComment.value = '';
      }
    };

    return {
      comments,
      newComment,
      addComment,
    };
  },
});
</script>
