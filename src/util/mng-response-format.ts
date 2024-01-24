const data = (value) => ({ rs_body: value })
const error = (err) => {
  return {
    error: {
      type: err?.type || 'UNKNOWN',
      detail: err?.detail || err?.message
    }
  }
}

export const AppManageResponseFormat = {
  data,
  error
}