modules.exports = {
    getCurrentPosition: {
        hy: {
            key: 'geolocation.getCurrentPosition',
        },
        wechat: {
            successHandle: ret => {
                return {
                    type: 'wechat',
                    coords: {
                        latitude: ret.latitude,
                        longitude: ret.longitude,
                    },
                };
            },
        },
        h5: {
            // 新版chrome要求：getCurrentPosition()和watchPosition() 不再支持http等非安全协议.
            handle: (opt = {}) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        data => {
                            opt.success({
                                type: 'h5',
                                coords: data.coords,
                            });
                        },
                        opt.fail,
                        {
                            enableHighAccuracy: !!opt.enableHighAccuracy,
                            timeout: opt.timeout || 5000,
                        }
                    );
                } else {
                    opt.fail({
                        ret: false,
                        errcode: -1,
                        errmsg: 'Geolocation is not supported!',
                    });
                }
            },
        },
    },
};
