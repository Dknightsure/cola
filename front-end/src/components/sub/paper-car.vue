<style lang="scss" scoped>
.container {
  position: fixed;
  width: 300px;
  left: 500px;
  bottom: 20px;
  z-index: 100;

  &:hover {
    ul {
      display: block;
    }
  }

  h1 {
    padding: 0 10px;
    background-color: #5cadff;
    color: #fff;
    text-align: center;
    position: relative;

    .submit-paper {
      position: absolute;
      right: -80px;
      top: 0px;
      display: none;
    }

    &:hover {
      .submit-paper {
        display: block;
      }
    }
  }

  ul {
    width: 100%;
    overflow: hidden;
    border: 1px solid #5cadff;
    display: none;

    li {
      font-size: 18px;
      padding: 0 20px;
      border-bottom: 1px dotted #657180;
      position: relative;
    }

    .icon-delete {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      display: none;
      cursor: pointer;
    }

    li:hover {
      .icon-delete {
        display: inline-block;
      }
    }
  }
}
</style>
<template>
  <div class="container">
    <Input placeholder="试卷标题..." style="width: 300px"></Input>
    <ul>
      <li>
        aasdfasdfasdfasdfasdf
        <div>
          <Icon type="trash-a" color="#ff0000" size="20" class="icon-delete"></Icon>
        </div>
      </li>
      <li>
        aasdfasdfasdfasdfasdf
        <div>
          <Icon type="trash-a" color="#ff0000" size="20" class="icon-delete"></Icon>
        </div>
      </li>
      <li>
        aasdfasdfasdfasdfasdf
        <div>
          <Icon type="trash-a" color="#ff0000" size="20" class="icon-delete"></Icon>
        </div>
      </li>
      <li>
        aasdfasdfasdfasdfasdf
        <div>
          <Icon type="trash-a" color="#ff0000" size="20" class="icon-delete"></Icon>
        </div>
      </li>
      <li>
        aasdfasdfasdfasdfasdf
        <div>
          <Icon type="trash-a" color="#ff0000" size="20" class="icon-delete"></Icon>
        </div>
      </li>
    </ul>
    <h1>试卷试题数：100<Button type="primary" class="submit-paper">发布试卷</Button></h1>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },

  methods: {
  }
}
</script>
