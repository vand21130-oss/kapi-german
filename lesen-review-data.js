// Vietnamese sentence translations and answer evidence for the existing tasks.
// German texts, answer keys and vocabulary stay in their original source files.
// Evidence tuples: [passage key, zero-based sentence index, exact German keywords].
const LESEN_REVIEW_DATA = {
    lesen_t1_konsum: {
        passages: {
            'people.a': [
                'Trước đây tôi thường mua đồ mới, mặc dù đồ cũ vẫn còn dùng được.',
                'Đặc biệt khi mua quần áo, tôi dễ bị những đợt giảm giá hấp dẫn.',
                'Giờ đây, trước mỗi lần mua, tôi tự hỏi liệu mình có thực sự cần món đồ đó không.',
                'Nếu có thể, tôi mang thiết bị hỏng đi sửa.',
                'Điều này không phải lúc nào cũng tiết kiệm tiền ngay, nhưng tôi không muốn tiếp tục ủng hộ xã hội dùng rồi vứt nữa.',
                'Dù vậy, tôi vẫn không sống hoàn toàn tối giản: những thứ tôi thường dùng và thực sự yêu thích vẫn được giữ lại.'
            ],
            'people.b': [
                'Sống bền vững là quan trọng, nhưng phải phù hợp với cuộc sống hằng ngày của tôi.',
                'Tôi làm việc nhiều giờ nên đặt mua khá nhiều thứ trên mạng.',
                'Tôi thấy phiền vì phải trả phí vận chuyển và đôi khi nhận nhiều kiện hàng khác nhau.',
                'Nhưng việc khiếu nại khi một sản phẩm không phù hợp còn khó chịu hơn.',
                'Khi đó tôi mất rất nhiều thời gian.',
                'Vì vậy tôi mua ít thường xuyên hơn, nhưng chọn những cửa hàng mà tôi từng có trải nghiệm tốt.',
                'Tôi không muốn từ bỏ hoàn toàn sự tiện lợi.'
            ],
            'people.c': [
                'Với tôi, vấn đề không nằm ở việc mua mà ở việc cho đồ đi.',
                'Nhiều đồ dùng gắn với kỷ niệm: chiếc cốc từ căn hộ ở ghép đầu tiên, sách thời đại học hay chiếc áo khoác của bà.',
                'Tất nhiên tôi không cần tất cả những thứ đó.',
                'Dù vậy, tôi không thể chia tay một nửa tài sản của mình chỉ trong một cuối tuần.',
                'Tôi phân loại để bỏ bớt đồ từng ít một và nghỉ sau mỗi thùng.',
                'Như vậy, quyết định này vẫn nằm trong mức tôi có thể chịu được.'
            ],
            'people.d': [
                'Không phải gia đình nào cũng cần sở hữu một chiếc máy khoan, một cái thang và mười dụng cụ ít khi dùng.',
                'Trong khu phố của chúng tôi có một chiếc tủ chung để mọi người mượn những thứ như vậy.',
                'Nhờ đó, chúng tôi bảo vệ tài nguyên và đồng thời có dịp trò chuyện với hàng xóm.',
                'Một số người sợ đồ sẽ bị hỏng hoặc không được trả lại.',
                'Ở chỗ chúng tôi, các quy định rõ ràng và một danh sách giúp giải quyết việc này.',
                'Đến nay, mọi việc diễn ra suôn sẻ đến ngạc nhiên.'
            ]
        },
        questions: {
            1: { vi:'Ai gắn đồ vật với những kỷ niệm cá nhân rất sâu sắc?', evidence:[['people.c',1,['hängen Erinnerungen']]], link:'persönliche Erinnerungen ↔ hängen Erinnerungen: đồ dùng gắn với kỷ niệm.' },
            2: { vi:'Ai sử dụng tài sản chung thay vì tự mua mọi thứ?', evidence:[['people.d',1,['gemeinsamen Schrank','ausleihen']]], link:'gemeinschaftlicher Besitz ↔ gemeinsamer Schrank; nutzen ↔ ausleihen.' },
            3: { vi:'Ai có ý thức bảo vệ môi trường nhưng vẫn không muốn từ bỏ sự tiện lợi?', evidence:[['people.b',0,['Nachhaltigkeit']],['people.b',6,['Komfort','nicht völlig verzichten']]], link:'Umweltbewusstsein ↔ Nachhaltigkeit; Bequemlichkeit ↔ Komfort. Chú ý nicht völlig: không từ bỏ hoàn toàn.' },
            4: { vi:'Ai cố gắng sửa lại những thứ không còn hoạt động?', evidence:[['people.a',3,['Defekte Geräte','reparieren']]], link:'funktionsunfähig ↔ defekt; wieder instand setzen ↔ reparieren.' },
            5: { vi:'Trước đây ai dễ bị lôi kéo vào những lần mua sắm ngoài kế hoạch?', evidence:[['people.a',1,['leicht von Rabatten locken']]], link:'zu Käufen verleitet werden ↔ sich von Rabatten locken lassen: bị giảm giá dụ mua.' },
            6: { vi:'Ai thấy việc chia sẻ đồ dùng cũng có lợi về mặt xã hội?', evidence:[['people.d',2,['mit den Nachbarn ins Gespräch']]], link:'sozialer Vorteil ↔ ins Gespräch kommen: tạo dịp giao tiếp với hàng xóm.' },
            7: { vi:'Ai thấy việc trả lại hàng không phù hợp đặc biệt phiền phức?', evidence:[['people.b',3,['Noch nerviger','Reklamation','nicht passt']]], link:'besonders lästig ↔ noch nerviger; ungeeignet ↔ nicht passen.' },
            8: { vi:'Ai cần tiến hành chậm rãi khi bỏ bớt đồ?', evidence:[['people.c',4,['portionsweise','Pause']]], link:'langsames Vorgehen ↔ portionsweise + Pause: làm từng ít một và nghỉ.' },
            9: { vi:'Ai muốn tiêu dùng có ý thức hơn nhưng vẫn giữ lại một số món đồ mình yêu thích?', evidence:[['people.a',2,['wirklich brauche']],['people.a',5,['wirklich mag','dürfen bleiben']]], link:'bewusster konsumieren ↔ hỏi có thật sự cần; không bỏ đồ yêu thích ↔ dürfen bleiben.' }
        }
    },
    lesen_t1_hybridarbeit: {
        passages: {
            'people.a': [
                'Từ khi làm việc tại nhà hai ngày mỗi tuần, tôi sắp xếp việc cân bằng giữa công việc và gia đình dễ dàng hơn nhiều.',
                'Buổi sáng tôi có thể đưa con đến trường và còn tiết kiệm thời gian đi làm.',
                'Tuy nhiên, ở nhà tôi cần giờ làm việc cố định.',
                'Nếu không, tôi sẽ tranh thủ làm việc nhà và mất khả năng theo dõi mọi việc.',
                'Vì vậy, với tôi sự kết hợp là lý tưởng: làm những việc cần tập trung ở nhà và họp tại văn phòng.'
            ],
            'people.b': [
                'Trong căn hộ nhỏ của mình, tôi hầu như không thể tập trung.',
                'Bàn ăn đồng thời là bàn làm việc, mà hàng xóm cũng chẳng yên tĩnh.',
                'Ở văn phòng đôi khi đồng nghiệp đến nói chuyện với tôi, nhưng tôi có bàn làm việc tốt và đầy đủ thiết bị kỹ thuật.',
                'Ngoài ra, nhiều ý tưởng chỉ nảy sinh trong những cuộc trò chuyện tự nhiên.',
                'Tôi sẵn lòng đến làm trực tiếp gần như mỗi ngày.'
            ],
            'people.c': [
                'Là người đi làm xa mỗi ngày, trước đây tôi mất gần hai tiếng trên tàu.',
                'Từ khi công ty cho phép làm việc từ xa, tôi có thêm rất nhiều thời gian.',
                'Tuy vậy, tôi không muốn bỏ hẳn văn phòng, vì hướng dẫn nhân viên mới qua mạng khá khó.',
                'Với tôi, điều quan trọng là các nhóm thống nhất những ngày cùng đến văn phòng.',
                'Nếu không, có người đi đến văn phòng rồi ngồi đó một mình trong cuộc họp trực tuyến.'
            ],
            'people.d': [
                'Việc một người có ngồi ở văn phòng hay không chẳng nói lên nhiều về hiệu quả làm việc của họ.',
                'Nhiệm vụ rõ ràng và thời hạn thực tế mới quan trọng hơn.',
                'Tuy nhiên, trong nhóm tôi, khối lượng công việc đã tăng từ khi ai cũng liên tục có thể được liên lạc.',
                'Một số người thậm chí trả lời tin nhắn vào tối muộn.',
                'Vì vậy chúng tôi cần những giới hạn mang tính bắt buộc.',
                'Làm việc từ xa chỉ là tiến bộ nếu sự tự do có được không lập tức bị lấp đầy bởi công việc bổ sung.'
            ]
        },
        questions: {
            1: { vi:'Ai cho rằng nhóm cần có ngày cùng đến văn phòng?', evidence:[['people.c',3,['gemeinsame Präsenztage']]], link:'gemeinsamer Bürotag ↔ gemeinsame Präsenztage: ngày có mặt trực tiếp cùng nhau.' },
            2: { vi:'Ai khó làm việc tốt trong căn hộ của mình?', evidence:[['people.b',0,['kaum konzentrieren']],['people.b',1,['nicht gerade leise']]], link:'schlecht arbeiten ↔ kaum konzentrieren; tiếng ồn cũng là trở ngại.' },
            3: { vi:'Ai cảnh báo rằng làm việc linh hoạt có thể dẫn đến làm nhiều hơn?', evidence:[['people.d',2,['Arbeitsmenge','gestiegen']],['people.d',5,['zusätzlicher Arbeit']]], link:'Mehrarbeit ↔ Arbeitsmenge gestiegen / zusätzliche Arbeit.' },
            4: { vi:'Ai thấy làm việc tại nhà có lợi cho gia đình?', evidence:[['people.a',0,['Beruf und Familie']],['people.a',1,['mein Kind','zur Schule bringen']]], link:'familiäre Vorteile ↔ sắp xếp gia đình tốt hơn, đưa con đi học.' },
            5: { vi:'Ai tiết kiệm được đặc biệt nhiều thời gian đi lại nhờ làm việc từ xa?', evidence:[['people.c',0,['fast zwei Stunden']],['people.c',1,['gewinne ich viel Zeit']]], link:'Reisezeit sparen ↔ trước đây đi tàu gần hai tiếng, giờ lấy lại thời gian đó.' },
            6: { vi:'Ai coi trọng ý tưởng nảy sinh ngoài kế hoạch khi trao đổi trực tiếp?', evidence:[['people.b',3,['Ideen','spontanen Gespräch']]], link:'ungeplant ↔ spontan; direkter Austausch ↔ Gespräch.' },
            7: { vi:'Ai cần quy tắc rõ ràng để không làm những việc khác khi ở nhà?', evidence:[['people.a',2,['feste Arbeitszeiten']],['people.a',3,['Hausarbeit','verliere den Überblick']]], link:'klare Regeln ↔ feste Arbeitszeiten; andere Aufgaben ↔ Hausarbeit.' },
            8: { vi:'Ai thấy kết quả công việc quan trọng hơn địa điểm làm việc?', evidence:[['people.d',0,['wenig über seine Leistung']],['people.d',1,['Wichtiger','klare Aufgaben']]], link:'Sitzen im Büro không chứng minh Leistung; nội dung công việc mới quan trọng.' },
            9: { vi:'Ai muốn làm những công việc khác nhau ở những địa điểm khác nhau?', evidence:[['people.a',4,['konzentrierte Aufgaben zu Hause','Besprechungen im Büro']]], link:'unterschiedliche Tätigkeiten ↔ việc cần tập trung và họp; unterschiedliche Orte ↔ nhà và văn phòng.' }
        }
    }
};

Object.assign(LESEN_REVIEW_DATA, {
    lesen_t4_vier_tage: {
        passages: {
            'opinions.a': ['Với cha mẹ, thêm một ngày nghỉ có thể cải thiện đáng kể việc cân bằng công việc và gia đình.', 'Khi đó, lịch hẹn, mua sắm và thời gian ở bên nhau không phải bị dồn hết vào cuối tuần.'],
            'opinions.b': ['Đợt thử nghiệm của chúng tôi thành công vì trước đó chúng tôi đã bỏ những cuộc họp không cần thiết.', 'Ít cuộc họp hơn và trách nhiệm rõ ràng hơn giúp chúng tôi tăng hiệu quả mà không phải làm lâu hơn.'],
            'opinions.c': ['Tôi muốn chỉ làm bốn ngày, nhưng không thể mất hai mươi phần trăm lương.', 'Chừng nào còn chưa rõ tiền lương có giữ nguyên hay không, mô hình này chưa thực sự là một lựa chọn cho tôi.'],
            'opinions.d': ['Khách hàng của chúng tôi cần được hỗ trợ từ thứ Hai đến thứ Sáu.', 'Vì vậy, tuần làm việc bốn ngày chỉ hoạt động nếu các nhóm chọn những ngày nghỉ khác nhau.', 'Điều này làm tăng công sức cần thiết để phối hợp.'],
            'opinions.e': ['Trong ngành chăm sóc, không thể đơn giản phân chia công việc vào ít hơn một ngày.', 'Bệnh nhân vẫn cần được chăm sóc.', 'Nếu không có thêm nhân viên, điều kiện làm việc thậm chí sẽ xấu đi.'],
            'opinions.f': ['Với người đi làm xa, ít đi một ngày làm cũng có nghĩa là ít đi một chuyến.', 'Điều đó tiết kiệm thời gian, tiền và khí thải.', 'Đặc biệt trên quãng đường dài, tác dụng đi kèm này hoàn toàn không phải là nhỏ.'],
            'opinions.g': ['Doanh nghiệp nên thử mô hình vài tháng trước và thu thập dữ liệu.', 'Chỉ sau đó mới có thể đánh giá mô hình có hợp với ngành và nhóm hay không.', 'Đổi ngay sang mô hình lâu dài sẽ là quá vội vàng.'],
            'opinions.h': ['Nếu vẫn nhồi cùng khối lượng việc vào bốn ngày, kết quả là bốn ngày cực dài và mệt mỏi, chứ không phải có thêm một ngày nghỉ.', 'Vì vậy, điều quyết định là thực sự giảm nhiệm vụ.'],
            example: ['Có thêm thời gian cho con cái và công việc riêng.']
        },
        questions: {
            22: { vi:'Hiệu quả hơn nhờ ít cuộc họp hơn.', evidence:[['opinions.b',1,['Weniger Sitzungen','Leistungsfähigkeit zu steigern']]], link:'Besprechungen ↔ Sitzungen; effizienter ↔ Leistungsfähigkeit steigern.' },
            23: { vi:'Muốn luôn liên lạc được thì cần nghỉ vào những ngày lệch nhau.', evidence:[['opinions.d',0,['Montag bis Freitag']],['opinions.d',1,['freien Tage unterschiedlich']]], link:'versetzte freie Tage ↔ freie Tage unterschiedlich legen, để vẫn phục vụ khách đủ năm ngày.' },
            24: { vi:'Không phải nghề nào cũng áp dụng được nếu không có thêm nhân lực.', evidence:[['opinions.e',1,['weiterhin Versorgung']],['opinions.e',2,['Ohne zusätzliches Personal']]], link:'zusätzliche Kräfte ↔ zusätzliches Personal. Nhu cầu chăm sóc bệnh nhân không mất đi vào ngày nghỉ.' },
            25: { vi:'Quãng đường đi làm cũng đóng vai trò.', evidence:[['opinions.f',0,['Pendler','eine Fahrt weniger']]], link:'Arbeitsweg ↔ Fahrt của Pendler, tức người đi làm xa.' },
            26: { vi:'Trước khi quyết định lâu dài, hãy thử trước.', evidence:[['opinions.g',0,['zunächst','testen']],['opinions.g',2,['dauerhafte Umstellung','voreilig']]], link:'erst ausprobieren ↔ zunächst testen; sofort dauerhaft áp dụng bị xem là vội vàng.' },
            27: { vi:'Cùng nhiệm vụ nhưng ít thời gian hơn sẽ tăng gánh nặng.', evidence:[['opinions.h',0,['dieselbe Arbeitsmenge','extrem lange und anstrengende Tage']]], link:'gleiche Aufgaben ↔ dieselbe Arbeitsmenge; Belastung ↔ lange und anstrengende Tage.' }
        }
    },
    lesen_t4_ehrenamt: {
        passages: {
            'opinions.a': ['Khi mới chuyển đến thành phố, tôi không quen ai.', 'Trong dự án vườn cộng đồng vì lợi ích chung, tôi nhanh chóng gặp những người cùng chí hướng.', 'Nhờ cùng tham gia hoạt động, chúng tôi đã trở thành những người bạn thực sự.'],
            'opinions.b': ['Nhiều hội dành quá nhiều thời gian cho biểu mẫu, đơn đề nghị và thanh quyết toán.', 'Người muốn tình nguyện giúp đỡ không nên phải học một khóa quản lý hành chính trước.', 'Bớt thủ tục quan liêu sẽ khiến nhiều người có động lực hơn rõ rệt.'],
            'opinions.c': ['Ngoài công việc và gia đình, tôi hầu như không có thời gian rảnh có thể lên lịch trước.', 'Tôi thích hỗ trợ các hoạt động, nhưng không thể nhận nhiệm vụ cố định vào mỗi thứ Tư.', 'Cảm giác có lỗi này lại khiến tôi ngại tham gia hơn.'],
            'opinions.d': ['Khu chúng tôi thiếu một con đường an toàn đến trường.', 'Chỉ sau khi phụ huynh thu thập dữ liệu, tổ chức trao đổi và gây sức ép công khai, thành phố mới thay đổi cách điều tiết giao thông.', 'Vì vậy, hoạt động cộng đồng tại địa phương có thể tạo thay đổi rất cụ thể.'],
            'opinions.e': ['Hoạt động tình nguyện thường được đánh giá tích cực khi xin việc.', 'Điều này dễ hiểu, vì qua đó ta học cách tổ chức, giao tiếp và chịu trách nhiệm về hành động của mình.', 'Tuy nhiên, không nên chỉ xem nó là khóa đào tạo nghề nghiệp miễn phí.'],
            'opinions.f': ['Không phải ai cũng có thể cam kết lâu dài.', 'Các nền tảng số hiện kết nối những nhiệm vụ nhỏ chỉ kéo dài một giờ.', 'Những hình thức linh hoạt này hạ rào cản và tiếp cận những người mà hội truyền thống khó thu hút.'],
            'opinions.g': ['Người dân không thể nhận hết mọi nhiệm vụ xã hội trong khi nhà nước rút lui.', 'Tình nguyện có thể bổ sung dịch vụ chuyên nghiệp, nhưng không bao giờ thay thế được ngân sách đầy đủ và nhân lực có chuyên môn.'],
            'opinions.h': ['Những hoạt động chung đều đặn củng cố sự gắn kết.', 'Đặc biệt, người cao tuổi cảm thấy kinh nghiệm của mình có ích và bớt cô đơn.', 'Điều này mang lại lợi ích cho cả khu dân cư, chứ không chỉ từng người.'],
            example: ['Tìm bạn bè mới qua những sở thích chung.']
        },
        questions: {
            22: { vi:'Thủ tục hành chính gây khó khăn cho hoạt động tình nguyện.', evidence:[['opinions.b',0,['Formularen','Anträgen','Abrechnungen']],['opinions.b',2,['Weniger Bürokratie']]], link:'Verwaltung ↔ biểu mẫu, đơn, thanh quyết toán; weniger Bürokratie là điều được đề nghị.' },
            23: { vi:'Hoạt động cộng đồng có thể trực tiếp thay đổi môi trường xung quanh.', evidence:[['opinions.d',1,['änderte die Stadt die Verkehrsführung']]], link:'Umgebung verändern ↔ thành phố đổi cách tổ chức giao thông sau sáng kiến của phụ huynh.' },
            24: { vi:'Ngoài ra, người tham gia còn có được kỹ năng hữu ích cho nghề nghiệp.', evidence:[['opinions.e',0,['Bei Bewerbungen']],['opinions.e',1,['Organisation','Kommunikation','Verantwortung']]], link:'beruflich nützliche Kompetenzen ↔ những kỹ năng này được đánh giá tốt khi Bewerbungen.' },
            25: { vi:'Hoạt động ngắn và linh hoạt tiếp cận được thêm nhiều nhóm người.', evidence:[['opinions.f',1,['nur eine Stunde']],['opinions.f',2,['flexiblen Formen','erreichen Menschen']]], link:'kurze Einsätze ↔ eine Stunde; weitere Gruppen ↔ người mà hội truyền thống khó tiếp cận.' },
            26: { vi:'Tình nguyện viên không được thay thế những dịch vụ thuộc trách nhiệm nhà nước.', evidence:[['opinions.g',1,['ergänzen','niemals','ersetzen']]], link:'ergänzen ≠ ersetzen: có thể bổ sung, nhưng niemals thay ngân sách và nhân lực chuyên môn.' },
            27: { vi:'Những nhiệm vụ chung giúp chống lại sự cô đơn.', evidence:[['opinions.h',1,['weniger allein']]], link:'gegen Einsamkeit ↔ weniger allein; regelmäßige gemeinsame Aktivitäten là nguyên nhân.' }
        }
    },
    lesen_t5_bibliothek: {
        passages: {
            'headings.a':['Đăng ký và thẻ thư viện.'], 'headings.b':['Thời hạn mượn và gia hạn.'], 'headings.c':['Mất thẻ.'], 'headings.d':['Tài liệu số.'],
            'headings.e':['Ứng xử trong phòng thư viện.'], 'headings.f':['Tủ khóa và bảo quản đồ.'], 'headings.g':['Phòng làm việc và phòng nhóm.'], 'headings.h':['Phí sao chụp.'],
            example:['Với thẻ còn hiệu lực, có thể truy cập sách điện tử và cơ sở dữ liệu cả khi ở ngoài thư viện.', 'Khi tư cách thành viên hết hạn, quyền truy cập tự động bị khóa.'],
            'sections.28':['Khi đăng ký, phải xuất trình căn cước hoặc hộ chiếu còn hiệu lực.', 'Sinh viên đã ghi danh tại trường đại học trong địa phương được giảm phí khi xuất trình giấy xác nhận sinh viên.', 'Thay đổi địa chỉ phải được thông báo cho thư viện.'],
            'sections.29':['Thông thường, có thể mượn sách trong bốn tuần.', 'Có thể gia hạn nếu tài liệu chưa được người khác đặt trước và chưa đạt thời gian mượn tối đa.', 'Sau khi hết thời hạn, người mượn phải trả phí trả chậm.'],
            'sections.30':['Có thể dùng chỗ làm việc cá nhân mà không cần đăng ký.', 'Ngược lại, phòng nhóm phải đặt trước và chỉ được đặt tối đa hai giờ mỗi ngày.', 'Nếu phòng đã đặt không có người đến trong mười lăm phút, thư viện có thể giao phòng cho người khác.']
        },
        questions: {
            28: { vi:'Điều 28', evidence:[['sections.28',0,['Zur Anmeldung','Personalausweis','Reisepass']]], link:'Anmeldung là đăng ký. Toàn đoạn nói về giấy tờ và thông tin khi đăng ký, không phải mất thẻ.' },
            29: { vi:'Điều 29', evidence:[['sections.29',0,['vier Wochen']],['sections.29',1,['Verlängerung','vorbestellt']]], link:'Leihfristen ↔ vier Wochen; Verlängerung chỉ được nếu chưa đặt trước và chưa vượt hạn tối đa.' },
            30: { vi:'Điều 30', evidence:[['sections.30',0,['Einzelarbeitsplätze']],['sections.30',1,['Gruppenräume','buchungspflichtig']]], link:'Arbeits- und Gruppenräume ↔ chỗ làm cá nhân và phòng nhóm; trọng tâm là cách dùng/đặt phòng.' }
        }
    },
    lesen_t5_homeoffice_regeln: {
        passages: {
            'headings.a':['Phê duyệt và điều kiện.'], 'headings.b':['Bảo vệ dữ liệu và tài liệu mật.'], 'headings.c':['Thời gian làm việc và khả năng liên lạc.'], 'headings.d':['Sức khỏe tại nơi làm việc.'],
            'headings.e':['Chi phí và trang thiết bị kỹ thuật.'], 'headings.f':['Tai nạn trong khi làm việc.'], 'headings.g':['Chấm dứt thỏa thuận.'], 'headings.h':['Sử dụng thiết bị cá nhân.'],
            example:['Thành viên gia đình không được xem dữ liệu cá nhân.', 'Bản in có dữ liệu nhạy cảm phải được cất trong đồ chứa khóa kín và tiêu hủy tại công ty.'],
            'sections.28':['Trước khi bắt đầu, việc làm từ xa phải được thỏa thuận bằng văn bản với quản lý có trách nhiệm.', 'Điều kiện là có thể làm nhiệm vụ ngoài cơ sở công ty mà không ảnh hưởng đến hoạt động của doanh nghiệp.', 'Không có quyền tự động được làm từ xa.'],
            'sections.29':['Áp dụng giờ làm linh hoạt của công ty và thời gian nghỉ theo luật.', 'Nhân viên phải có thể được liên lạc trong khung giờ cốt lõi đã thống nhất.', 'Ngoài khung giờ này, không có nghĩa vụ trả lời tin nhắn ngay.'],
            'sections.30':['Công ty cung cấp máy tính xách tay, bộ nguồn và phần mềm cần thiết.', 'Chương trình bổ sung phải được bộ phận IT cho phép sử dụng.', 'Chi phí cá nhân thường xuyên như điện hoặc internet không được hoàn lại, trừ khi có thỏa thuận riêng khác.']
        },
        questions: {
            28: { vi:'Điều 28', evidence:[['sections.28',0,['schriftlich','Führungskraft vereinbart']],['sections.28',1,['Voraussetzung']]], link:'Genehmigung ↔ schriftlich vereinbaren; Voraussetzungen ↔ điều kiện không ảnh hưởng công ty.' },
            29: { vi:'Điều 29', evidence:[['sections.29',0,['Gleitzeit','Ruhezeiten']],['sections.29',1,['Kernzeit','erreichbar']]], link:'Arbeitszeit ↔ Gleitzeit / Kernzeit; Erreichbarkeit ↔ erreichbar sein.' },
            30: { vi:'Điều 30', evidence:[['sections.30',0,['Laptop','Software']],['sections.30',2,['Kosten','nicht erstattet']]], link:'technische Ausstattung ↔ Laptop, Netzteil, Software; Kosten ↔ quy định hoàn chi phí.' }
        }
    }
});

Object.assign(LESEN_REVIEW_DATA, {
    lesen_t3_aufmerksamkeit: {
        passages: {
            'article.0': ['Chỉ định nhìn điện thoại một chút, vậy mà đột nhiên hai mươi phút đã trôi qua.', 'Nhiều người biết cảm giác này.', 'Các nhà nghiên cứu giải thích rằng một phần nguyên nhân là mạng xã hội liên tục đưa ra nội dung mới, không đoán trước được.', 'Một video thú vị hay một tin nhắn thân thiện tạo cảm giác như một phần thưởng dopamine ngắn hạn.', 'Vì phần thưởng tiếp theo có thể xuất hiện bất cứ lúc nào, việc đặt điện thoại xuống trở nên khó khăn.'],
            'article.1': ['Vấn đề không chỉ là thời gian bị mất.', 'Mỗi lần gián đoạn đều buộc não phải làm quen lại với nhiệm vụ sau đó.', 'Người cứ vài phút lại đọc tin nhắn trong lúc viết thường cần nhiều thời gian hơn đáng kể.', 'Ngay cả khi việc trả lời chỉ mất vài giây, nó vẫn có thể làm gián đoạn dòng công việc.', 'Nghiên cứu còn cho thấy chỉ một chiếc điện thoại nằm trong tầm mắt cũng chiếm sự chú ý: một phần não phải liên tục kiềm chế ý muốn cầm lấy nó.'],
            'article.2': ['Cảm nhận về thời gian thay đổi rõ rệt.', 'Trong chuỗi bài đăng ngắn vô tận, hầu như không có tín hiệu dừng tự nhiên.', 'Sách có điểm kết thúc chương, chương trình truyền hình có điểm kết thúc tập.', 'Ngược lại, ứng dụng tự tải nội dung tiếp theo.', 'Người dùng phải tự quyết định khi nào là đủ, nhưng chính quyết định ấy càng khó hơn khi họ mệt dần.'],
            'article.3': ['Với hầu hết mọi người, từ bỏ hoàn toàn vừa không thực tế vừa không cần thiết.', 'Thay vào đó, chuyên gia khuyên giảm những tín hiệu gây phiền nhiễu.', 'Có thể tắt thông báo và để điện thoại ngoài tầm mắt khi làm việc cần tập trung.', 'Việc ấn định những thời điểm cụ thể để đọc tin nhắn cũng hữu ích.', 'Nhờ vậy, mỗi khi có tiếng báo, ta không phải quyết định lại xem có nên phản ứng không.'],
            'article.4': ['Đồng thời, các nhà tâm lý cảnh báo về giải pháp chỉ dựa vào kỹ thuật.', 'Người liên tục cầm điện thoại vì buồn chán, cô đơn hay căng thẳng sẽ thay hành vi đó bằng một màn hình khác.', 'Vì vậy, điều quan trọng là nhận ra thói quen của mình và tìm lựa chọn phù hợp: đi dạo ngắn, trò chuyện hay nghỉ ngơi không dùng phương tiện truyền thông.', 'Mục tiêu là không vô tình bỏ bê thế giới thực, chứ không phải từ chối thế giới số.']
        },
        questions: {
            16: { vi:'Vì sao nhiều người khó rời mạng xã hội?', options:{a:'Nội dung đặc biệt khó về mặt chuyên môn.',b:'Những kích thích dễ chịu mới có thể xuất hiện bất cứ lúc nào.',c:'Ứng dụng chỉ hoạt động trong thời gian ngắn.'}, evidence:[['article.0',4,['nächste Belohnung','jederzeit']]], link:'angenehme Reize ↔ Belohnung; jederzeit ↔ bất cứ lúc nào. Độ khó chuyên môn không phải nguyên nhân được nêu.' },
            17: { vi:'Một lần gián đoạn ngắn gây ra điều gì khi làm việc?', options:{a:'Ta phải nhập tâm lại vào công việc.',b:'Sau đó ta làm những nhiệm vụ dễ hơn.',c:'Ta nhớ các chi tiết tốt hơn.'}, evidence:[['article.1',1,['erneut in eine Aufgabe einzuarbeiten']]], link:'sich erneut einarbeiten ↔ sich erneut hineindenken: phải nhập tâm lại, không phải nhiệm vụ trở nên dễ hơn.' },
            18: { vi:'Chỉ một chiếc điện thoại trong tầm mắt đã có thể gây ra điều gì?', options:{a:'Nó cải thiện khả năng phản ứng nhanh.',b:'Nó tự thay đổi thời gian dùng màn hình.',c:'Nó chiếm một phần sự chú ý.'}, evidence:[['article.1',4,['sichtbares Smartphone','Aufmerksamkeit bindet','Impuls kontrollieren']]], link:'Aufmerksamkeit beanspruchen ↔ Aufmerksamkeit binden. Não tốn sự chú ý để kiềm chế ý muốn cầm điện thoại.' },
            19: { vi:'Vì sao ta dễ mất cảm nhận về thời gian trong ứng dụng?', options:{a:'Không có những điểm kết thúc tự nhiên rõ ràng.',b:'Các bài đăng ngày càng dài.',c:'Thời gian thường bị ẩn đi.'}, evidence:[['article.2',1,['kaum natürliche Stoppsignale']],['article.2',3,['automatisch den nächsten Inhalt']]], link:'Endpunkte fehlen ↔ kaum Stoppsignale. Việc tự tải tiếp làm luồng nội dung không kết thúc.' },
            20: { vi:'Chuyên gia khuyên làm gì để tập trung làm việc?', options:{a:'Trả lời mọi tin nhắn ngay.',b:'Để điện thoại ngoài tầm mắt.',c:'Chỉ giao tiếp qua máy tính.'}, evidence:[['article.3',2,['außer Sichtweite']]], link:'außer Sichtweite là tín hiệu trực tiếp cho b. Bài khuyên chọn giờ đọc tin nhắn, không trả lời tất cả ngay.' },
            21: { vi:'Theo các nhà tâm lý, điều gì chưa đủ?', options:{a:'Chỉ thay đổi những cài đặt kỹ thuật.',b:'Nghỉ ngơi mà không dùng thiết bị số.',c:'Quan sát nguyên nhân hành vi của bản thân.'}, evidence:[['article.4',0,['rein technischen Lösung']],['article.4',1,['Langeweile','Einsamkeit','Stress']]], link:'nur technische Einstellungen ↔ rein technische Lösung. Nếu gốc vấn đề là cảm xúc, đổi cài đặt chưa giải quyết được.' }
        }
    },
    lesen_t3_fleischersatz: {
        passages: {
            'article.0': ['Burger thực vật, xúc xích từ protein đậu Hà Lan và thịt nguội không có thành phần động vật ngày càng chiếm nhiều chỗ trên kệ siêu thị.', 'Sản phẩm thay thế thịt từ lâu đã không chỉ nhắm đến những người ăn chay hoàn toàn.', 'Nhiều người mua chỉ muốn bỏ thịt thông thường vào một số ngày mà không thay đổi cơ bản những món ăn quen thuộc.'],
            'article.1': ['Xét về sinh thái, những sản phẩm này có thể có lợi.', 'Việc sản xuất nguyên liệu thực vật thường cần ít diện tích và nước hơn chăn nuôi công nghiệp.', 'Lượng khí nhà kính thải ra cũng có thể thấp hơn.', 'Tuy nhiên, không có gì bảo đảm tác động sinh thái luôn tốt: nếu nguyên liệu được vận chuyển xa hoặc chế biến rất công phu, lợi ích sẽ nhỏ hơn.'],
            'article.2': ['Vì vậy, chuyên gia dinh dưỡng khuyên xem kỹ thành phần.', 'Một số sản phẩm thay thế có nhiều muối, chất béo và phụ gia để tạo mùi vị và kết cấu giống thịt.', 'Do đó, có nguồn gốc thực vật không tự động có nghĩa là lành mạnh.', 'Đồng thời, nhiều sản phẩm cung cấp chất đạm và có thể là một phần của chế độ ăn cân bằng.'],
            'article.3': ['Điều quyết định là đem nó so sánh với thứ gì.', 'Một sản phẩm thay thế được chế biến nhiều có thể kém lợi hơn món đơn giản từ đậu lăng và rau.', 'Ngược lại, khi so với xúc xích nhiều chất béo, nó có thể có kết quả tốt hơn.', 'Vì vậy, nhận xét chung chung không giúp được nhiều.', 'Ai chỉ nhìn nhãn xanh dễ bỏ qua việc một sản phẩm thuần chay cũng có thể nghèo dinh dưỡng.'],
            'article.4': ['Các tổ chức bảo vệ người tiêu dùng yêu cầu cách ghi nhãn dễ hiểu hơn.', 'Người mua nên nhìn một lần là biết sản phẩm đã được chế biến đến mức nào, nguyên liệu chính đến từ đâu và có giá trị dinh dưỡng gì.', 'Cho đến khi những thông tin này thống nhất ở mọi nơi, người mua vẫn phải so sánh bao bì.', 'Và đôi khi lựa chọn đơn giản nhất là một món vốn đã có nguồn gốc thực vật, không phải thịt hay sản phẩm thay thịt.']
        },
        questions: {
            16: { vi:'Theo bài, ai ngày càng mua nhiều sản phẩm thay thế thịt?', options:{a:'Chỉ những người luôn ăn chay hoàn toàn.',b:'Cả những người chỉ ăn ít thịt hơn vào một số thời điểm.',c:'Chủ yếu người bị dị ứng thực phẩm.'}, evidence:[['article.0',1,['nicht mehr nur']],['article.0',2,['an einigen Tagen']]], link:'nicht mehr nur loại đáp án a. an einigen Tagen ↔ zeitweise: giảm thịt vào một số ngày.' },
            17: { vi:'Khi nào lợi ích sinh thái có thể nhỏ đi?', options:{a:'Khi nguyên liệu thực vật được trồng trong vùng.',b:'Khi sản phẩm cần ít nước.',c:'Khi vận chuyển và chế biến rất tốn công sức.'}, evidence:[['article.1',3,['weite Strecken','aufwendig verarbeitet','Vorteil kleiner']]], link:'Transport über weite Strecken + aufwendige Verarbeitung làm lợi ích nhỏ hơn. Ít nước là lợi thế, không phải nguyên nhân giảm lợi ích.' },
            18: { vi:'Chuyên gia dinh dưỡng cảnh báo điều gì?', options:{a:'Coi mọi sản phẩm thực vật đều lành mạnh.',b:'Sử dụng chất đạm từ thực vật.',c:'So sánh thực phẩm theo lượng muối.'}, evidence:[['article.2',2,['nicht automatisch gesund']]], link:'grundsätzlich für gesund halten trái với nicht automatisch gesund. Bài không cấm dùng protein thực vật.' },
            19: { vi:'Vì sao khó đánh giá chung cho mọi trường hợp?', options:{a:'Giá thay đổi hằng ngày.',b:'Kết quả phụ thuộc vào sản phẩm được dùng để so sánh.',c:'Luật cấm danh sách thành phần.'}, evidence:[['article.3',0,['womit man vergleicht']],['article.3',1,['ungünstiger']],['article.3',2,['besser abschneiden']]], link:'Cùng một sản phẩm có thể kém món đậu lăng nhưng tốt hơn xúc xích nhiều mỡ; kết luận phụ thuộc vào đối tượng so sánh.' },
            20: { vi:'Theo bài, bao bì xanh có thể che khuất điều gì?', options:{a:'Sản phẩm có ít dưỡng chất.',b:'Sản phẩm có thịt.',c:'Sản phẩm đã bán hết.'}, evidence:[['article.3',4,['grüne Etikett','nährstoffarm']]], link:'wenig Nährstoffe ↔ nährstoffarm. Nhãn xanh không chứng minh giá trị dinh dưỡng tốt.' },
            21: { vi:'Các tổ chức bảo vệ người tiêu dùng yêu cầu điều gì?', options:{a:'Cấm thực phẩm được chế biến nhiều.',b:'Thông tin thống nhất và dễ hiểu.',c:'Giảm giá thịt thông thường.'}, evidence:[['article.4',0,['verständlichere Kennzeichnungen']],['article.4',2,['überall einheitlich']]], link:'leicht verständliche Informationen ↔ verständlichere Kennzeichnungen; einheitlich ↔ thống nhất. Bài yêu cầu thông tin, không yêu cầu cấm.' }
        }
    }
});

Object.assign(LESEN_REVIEW_DATA, {
    lesen_t2_reparatur: {
        passages: {
            'segments.0': ['Điện thoại có pin yếu, máy nướng bánh bị lỏng dây hay máy giặt không đóng được cửa: nhiều thiết bị được thay ngay khi bị hỏng.', 'Trong khi đó, về mặt kỹ thuật, chúng thường vẫn có thể sửa được.'],
            'segments.1': ['Một nguyên nhân là trước khi mua, người tiêu dùng khó biết sản phẩm có dễ mở ra và sửa chữa hay không.', 'Một số thiết bị có pin gắn cố định; với những thiết bị khác, chỉ sau vài năm đã không còn phụ tùng phù hợp.'],
            'segments.2': ['Vì vậy, một số nước châu Âu đang tìm cách khiến việc sửa chữa hấp dẫn hơn.', 'Ở một số khu vực, khách hàng được hoàn lại một phần chi phí nếu mang thiết bị hỏng đến sửa tại cơ sở được công nhận.'],
            'segments.3': ['Nhu cầu rất lớn.', 'Các xưởng sửa chữa cho biết nhiều người muốn sử dụng thiết bị lâu hơn nếu việc sửa chữa có giá phải chăng và không phức tạp.'],
            'segments.4': ['Tuy nhiên, những người phản đối nghi ngờ rằng chỉ trợ cấp tài chính là đủ.', 'Nhà sản xuất cần thiết kế sản phẩm sao cho có thể thay từng bộ phận mà không cần dụng cụ chuyên biệt.'],
            'segments.5': ['Phần mềm cũng đóng vai trò quan trọng.', 'Một chiếc điện thoại vẫn hoạt động về mặt kỹ thuật sẽ trở nên vô dụng nếu không còn được cập nhật bảo mật.', 'Khi đó, người tiêu dùng mua máy mới chỉ để luôn theo kịp công nghệ số.'],
            'segments.6': ['Thời gian sử dụng dài hơn không chỉ giảm gánh nặng cho các gia đình.', 'Nó còn có thể tiết kiệm nguyên liệu, tránh rác thải và nhờ đó bảo vệ tài nguyên.', 'Vì vậy, việc từ bỏ xã hội dùng rồi vứt bắt đầu ngay từ khâu thiết kế sản phẩm, chứ không đợi đến bãi tái chế.'],
            'options.a': ['Tuy nhiên, đơn đề nghị phải được nộp cùng hóa đơn.'],
            'options.b': ['Vì vậy, chuyên gia yêu cầu việc cập nhật phải được bảo đảm bắt buộc trong thời gian dài hơn.'],
            'options.c': ['Điều còn thiếu là thông tin đáng tin cậy về khả năng sửa chữa.'],
            'options.d': ['Một thiết kế như vậy có thể làm chi phí sản xuất tăng đôi chút.'],
            'options.e': ['Dù vậy, số lượng thiết bị nhà bếp mới bán ra vẫn tăng mỗi năm.'],
            'options.f': ['Khoản hỗ trợ sửa chữa chính là để giúp giải quyết điểm này.'],
            'options.g': ['Một số xưởng sửa chữa về nguyên tắc từ chối thiết bị điện tử.'],
            'options.h': ['Những đánh giá đầu tiên cho thấy chương trình thực sự được sử dụng.']
        },
        questions: {
            10: { vi:'Chỗ trống 10', evidence:[['segments.1',0,['kaum erkennen','reparieren']]], link:'Informationen über die Reparierbarkeit được cụ thể hóa ngay sau chỗ trống: người mua kaum erkennen, tức khó biết sản phẩm có dễ sửa không.' },
            11: { vi:'Chỗ trống 11', evidence:[['segments.2',1,['einen Teil der Kosten zurück']]], link:'Reparaturbonus ở câu f được giải thích trong đoạn tiếp theo bằng việc hoàn lại một phần chi phí sửa chữa.' },
            12: { vi:'Chỗ trống 12', evidence:[['segments.2',1,['Kosten zurück','anerkannten Betrieb']]], link:'Sau quyền nhận hỗ trợ, Allerdings bổ sung điều kiện nộp đơn và hóa đơn. Rechnung gắn với Kosten của việc sửa chữa.' },
            13: { vi:'Chỗ trống 13', evidence:[['segments.3',0,['Nachfrage ist groß']]], link:'Angebot tatsächlich genutzt ↔ Nachfrage ist groß: đánh giá xác nhận chương trình có người dùng thực tế.' },
            14: { vi:'Chỗ trống 14', evidence:[['segments.4',1,['Produkte so konstruieren','ohne Spezialwerkzeug']]], link:'Ein solches Design trỏ về cách thiết kế dễ thay bộ phận ngay trước đó; zwar báo trước một hạn chế về chi phí.' },
            15: { vi:'Chỗ trống 15', evidence:[['segments.5',1,['keine Sicherheitsupdates mehr']]], link:'Deshalb nối nguyên nhân thiếu cập nhật với yêu cầu Updates über einen längeren Zeitraum.' }
        }
    },
    lesen_t2_stadtverkehr: {
        passages: {
            'segments.0': ['Buổi sáng, ô tô ùn tắc trên các đường vào thành phố, xe buýt tiến chậm và cư dân than phiền về tiếng ồn.', 'Vì vậy, nhiều thành phố tìm cách giảm giao thông trong trung tâm.'],
            'segments.1': ['Một biện pháp thường được bàn đến là phí vào trung tâm bằng ô tô.', 'Ai lái ô tô vào một khu vực nhất định phải trả phí.', 'Những người ủng hộ kỳ vọng biện pháp này làm giảm số xe và ô nhiễm bụi mịn.'],
            'segments.2': ['Tuy nhiên, chỉ thu phí không giải quyết được vấn đề.', 'Người đi làm xa cần một lựa chọn thay thế đáng tin cậy; nếu không, việc đi lại sẽ đắt hơn, đặc biệt với người có thu nhập thấp.'],
            'segments.3': ['Những lựa chọn đó gồm tàu chạy thường xuyên hơn, đường xe đạp an toàn và bãi đỗ tại ga ngoài trung tâm.', 'Điều đặc biệt quan trọng là giao thông đường sắt cũng phải hoạt động vào buổi tối.'],
            'segments.4': ['Tuy nhiên, trong giai đoạn xây dựng các tuyến mới, nhiều khó khăn bổ sung xuất hiện.', 'Đường bị đóng, tuyến xe buýt được đổi lộ trình và hành khách phải tính đến việc chậm trễ.'],
            'segments.5': ['Để người dân chấp nhận những bất tiện này, thành phố phải thông báo sớm và dễ hiểu.', 'Chỉ thông báo trên màn hình điện tử là chưa đủ, vì không phải ai cũng liên tục dùng ứng dụng.'],
            'segments.6': ['Về lâu dài, một hệ thống phối hợp tốt có thể khiến trung tâm yên tĩnh và dễ tiếp cận hơn.', 'Điều quyết định là phải cung cấp lựa chọn tốt hơn, bên cạnh việc làm cho lái ô tô kém hấp dẫn đi.'],
            'options.a': ['Một số thành phố châu Âu đã có kinh nghiệm với biện pháp này.'],
            'options.b': ['Vì vậy, giao thông công cộng phải được mở rộng đồng thời.'],
            'options.c': ['Trong tương lai, chỉ khách du lịch mới được phép đỗ xe ở đó.'],
            'options.d': ['Chỉ khi đó, việc chuyển sang phương tiện khác mới khả thi với cả người làm theo ca.'],
            'options.e': ['Trong ngắn hạn, tình hình giao thông thậm chí có thể trở nên khó nắm bắt hơn vì điều đó.'],
            'options.f': ['Dù vậy, về nguyên tắc tất cả các nhà bán lẻ đều phản đối kế hoạch.'],
            'options.g': ['Vì vậy, thông tin nên được phổ biến qua nhiều kênh.'],
            'options.h': ['Nhưng trước hết cần đặt câu hỏi: có thể đạt được điều đó bằng những biện pháp nào?']
        },
        questions: {
            10: { vi:'Chỗ trống 10', evidence:[['segments.0',1,['Wegen','Verkehr im Zentrum zu verringern']]], link:'Wegen ↔ Maßnahmen. Câu h đặt câu hỏi về biện pháp; đoạn sau trả lời bằng City-Maut.' },
            11: { vi:'Chỗ trống 11', evidence:[['segments.1',0,['City-Maut']]], link:'damit trong câu a trỏ về City-Maut đã được giới thiệu ngay trước đó.' },
            12: { vi:'Chỗ trống 12', evidence:[['segments.2',1,['verlässliche Alternative']]], link:'Alternative phải được cung cấp bằng cách mở rộng giao thông công cộng. Deshalb thể hiện kết luận; đoạn sau nêu tàu, đường xe đạp và bãi đỗ.' },
            13: { vi:'Chỗ trống 13', evidence:[['segments.3',1,['auch am Abend funktioniert']]], link:'Nur dann trỏ về điều kiện có tàu cả buổi tối. Điều này mới cho phép Schichtarbeiter chuyển phương tiện.' },
            14: { vi:'Chỗ trống 14', evidence:[['segments.4',1,['gesperrt','umgeleitet','Verzögerungen']]], link:'dadurch trỏ về đóng đường và đổi tuyến; kurzfristig giới hạn khó khăn này ở ngắn hạn.' },
            15: { vi:'Chỗ trống 15', evidence:[['segments.5',1,['allein reichen nicht','nicht jeder']]], link:'Chỉ màn hình hay ứng dụng không tiếp cận hết mọi người, nên mehrere Kanäle là giải pháp nối đúng ý.' }
        }
    }
});
