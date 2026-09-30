// Companion notes for the six existing daily stories; no change to rewards.
const DAILY_STORY_REVIEW_DATA = [
    {
        vi:['Buổi sáng, một chiếc ô đáng ngờ đứng trước cửa nhà tôi.', 'Nó không thuộc về ai, nhưng đã thất vọng về tôi rồi.', 'Tôi mang nó theo.', 'Từ đó, trời chỉ mưa bên trong căn hộ của tôi.'],
        glossary:[
            {de:'verdächtig',vi:'đáng ngờ',note:'Tính từ chỉ điều khiến ta nghi ngờ. Trong truyện, verdächtiger có đuôi -er vì đứng trước Regenschirm giống đực ở Nominativ với mạo từ ein.',example:'Vor der Tür steht ein verdächtiger Koffer.',exampleVi:'Trước cửa có một chiếc vali đáng ngờ.'},
            {de:'von jemandem enttäuscht sein',vi:'thất vọng về ai',note:'enttäuscht sein + von + Dativ. von mir: về tôi; không phải về chiếc ô.',example:'Ich bin von dem Ergebnis enttäuscht.',exampleVi:'Tôi thất vọng về kết quả.'},
            {de:'innerhalb',vi:'bên trong; trong vòng',note:'Trong truyện chỉ phạm vi không gian. innerhalb meiner Wohnung dùng Genitiv. Với thời gian: innerhalb einer Woche.',example:'Die Reparatur ist innerhalb einer Woche fertig.',exampleVi:'Việc sửa chữa hoàn tất trong vòng một tuần.'}
        ]
    },
    {
        vi:['Trong siêu thị, một củ khoai tây rất lịch sự xin tôi đừng mua nó.', 'Nó nói rằng thứ Hai nó có một cuộc hẹn quan trọng.', 'Tôi tôn trọng kế hoạch của nó và thay vào đó mua một củ hành không có kế hoạch tương lai.'],
        glossary:[
            {de:'höflich',vi:'lịch sự',note:'Ở đây höflich mô tả cách củ khoai đưa ra lời đề nghị. Đối nghĩa: unhöflich, bất lịch sự.',example:'Sie bat mich höflich um Hilfe.',exampleVi:'Cô ấy lịch sự nhờ tôi giúp.'},
            {de:'jemanden bitten, etwas zu tun',vi:'xin/nhờ ai làm gì',note:'bitten đi với người ở Akkusativ và mệnh đề zu. sie nicht zu kaufen: đừng mua nó. habe là Konjunktiv I, thuật lại lời củ khoai.',example:'Ich bitte dich, kurz zu warten.',exampleVi:'Tớ nhờ cậu đợi một chút.'},
            {de:'stattdessen',vi:'thay vào đó',note:'Dùng khi chọn một hành động khác. Trong truyện: không mua khoai mà mua hành.',example:'Der Bus fällt aus. Ich nehme stattdessen die Bahn.',exampleVi:'Xe buýt bị hủy chuyến. Thay vào đó tôi đi tàu.'}
        ]
    },
    {
        vi:['Xe buýt đến đúng giờ, mở cửa và nói hôm nay nó thấy mình không có trách nhiệm phụ trách việc này.', 'Tất cả hành khách gật đầu tỏ vẻ thông cảm.', 'Rồi chúng tôi cùng đi bộ, trong khi xe buýt phía sau chậm rãi đi nghỉ.'],
        glossary:[
            {de:'zuständig',vi:'có trách nhiệm phụ trách; thuộc thẩm quyền',note:'zuständig für + Akkusativ. Đây là người/bộ phận phụ trách một việc; không đơn giản đồng nghĩa với tính cách có trách nhiệm.',example:'Wer ist für die Anmeldung zuständig?',exampleVi:'Ai phụ trách việc đăng ký?'},
            {de:'verständnisvoll',vi:'thông cảm, thấu hiểu',note:'verständnisvoll nicken: gật đầu thể hiện sự thông cảm. Không phải verständlich, nghĩa là dễ hiểu.',example:'Die Kollegin reagierte verständnisvoll.',exampleVi:'Đồng nghiệp phản ứng đầy thông cảm.'},
            {de:'zu Fuß gehen',vi:'đi bộ',note:'Cụm cố định zu Fuß, không dùng mit Fuß. Trong truyện khách phải tự đi vì xe buýt đi nghỉ.',example:'Heute gehe ich zu Fuß nach Hause.',exampleVi:'Hôm nay tôi đi bộ về nhà.'}
        ]
    },
    {
        vi:['Tủ lạnh của tôi muốn có một cuộc trò chuyện nghiêm túc.', 'Nó nói nó không hài lòng với sự thiếu quyết đoán của tôi: đêm nào tôi cũng mở cửa nhưng chẳng lấy gì.', 'Giờ nó yêu cầu giờ thăm cố định.'],
        glossary:[
            {de:'Unentschlossenheit',vi:'sự thiếu quyết đoán',note:'Danh từ giống cái: die Unentschlossenheit. Tính từ: unentschlossen. Trong truyện, mở tủ mãi nhưng không quyết định lấy gì.',example:'Seine Unentschlossenheit kostet viel Zeit.',exampleVi:'Sự thiếu quyết đoán của anh ấy làm mất nhiều thời gian.'},
            {de:'mit etwas unzufrieden sein',vi:'không hài lòng với điều gì',note:'mit + Dativ. sei là Konjunktiv I dùng thuật lại lời của tủ lạnh.',example:'Ich bin mit dieser Lösung unzufrieden.',exampleVi:'Tôi không hài lòng với giải pháp này.'},
            {de:'feste Besuchszeiten',vi:'giờ thăm cố định',note:'fest ở đây là cố định, đã ấn định. Cụm đời sống thường gặp ở bệnh viện; trò đùa là tủ lạnh tự đặt lịch tiếp khách.',example:'Das Krankenhaus hat feste Besuchszeiten.',exampleVi:'Bệnh viện có giờ thăm cố định.'}
        ]
    },
    {
        vi:['Một chú bồ câu ứng tuyển vị trí trưởng văn phòng.', 'Khi được hỏi về điểm mạnh lớn nhất, nó trả lời: “Tôi có thể vừa kiên trì vừa quan sát bánh mì.”', 'Nó được tuyển ngay lập tức.'],
        glossary:[
            {de:'hartnäckig',vi:'kiên trì, dai dẳng; đôi khi là cố chấp',note:'Trong câu này, bồ câu tự coi khả năng bám mục tiêu là điểm mạnh. Từ có thể tích cực hoặc tiêu cực tùy ngữ cảnh: hartnäckig bleiben là kiên trì; hartnäckiger Husten là ho dai dẳng.',example:'Sie blieb hartnäckig und fand eine Lösung.',exampleVi:'Cô ấy kiên trì và tìm được giải pháp.'},
            {de:'sich als ... bewerben',vi:'ứng tuyển làm ...',note:'Động từ phản thân: ich bewerbe mich, sie bewarb sich. als giới thiệu vị trí; um thường đi với die Stelle.',example:'Ich bewerbe mich als Pflegekraft.',exampleVi:'Tôi ứng tuyển vị trí nhân viên điều dưỡng.'},
            {de:'eingestellt werden',vi:'được tuyển dụng',note:'Passiv: wurde eingestellt là đã được tuyển. Trong ngữ cảnh việc làm, einstellen không phải cài đặt thiết bị.',example:'Er wurde nach dem Gespräch eingestellt.',exampleVi:'Anh ấy được tuyển sau buổi phỏng vấn.'}
        ]
    },
    {
        vi:['Trong thang máy, tôi bấm nút tầng ba.', 'Màn hình trả lời: thứ Ba.', 'Sau một thoáng do dự, tôi bước ra.', 'Không nên cãi những cỗ máy có thể điều khiển lịch.'],
        glossary:[
            {de:'kurze Zögerung',vi:'một thoáng do dự',note:'die Zögerung: sự do dự; động từ zögern. nach einer kurzen Zögerung dùng Dativ sau nach.',example:'Nach einer kurzen Zögerung sagte sie zu.',exampleVi:'Sau một thoáng do dự, cô ấy đồng ý.'},
            {de:'aussteigen',vi:'xuống/ra khỏi phương tiện',note:'Động từ tách: ich steige aus; Präteritum: ich stieg aus. Ở đây là bước ra khỏi thang máy.',example:'Ich steige an der nächsten Haltestelle aus.',exampleVi:'Tôi xuống ở trạm tiếp theo.'},
            {de:'jemandem widersprechen',vi:'phản đối, nói trái ý ai',note:'widersprechen + Dativ. Maschinen ở đây là người bị phản đối; der Maschine widersprechen.',example:'Ich möchte dir nicht widersprechen.',exampleVi:'Tôi không muốn phản đối cậu.'}
        ]
    }
];
